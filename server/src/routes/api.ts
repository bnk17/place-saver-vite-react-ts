import { Hono } from 'hono';
import { db } from '../db/db';
import { customTags, places, placesId, placeTags } from '../db/schema';
import { eq, inArray } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';

const api = new Hono();

// Get all places with their tags
api.get('/places', async (c) => {
  try {
    const allPlacesId = await db.select().from(placesId);

    // Get all place IDs
    const placeIds = allPlacesId.map((place) => place.id);

    // Get all place-tag relationships
    const placeIdTagRelations = await db
      .select()
      .from(placeTags)
      .where(inArray(placeTags.placeId, placeIds));

    // Get all tag IDs
    const tagIds = placeIdTagRelations.map((relation) => relation.tagId);

    // Get all tags
    const allTags =
      tagIds.length > 0
        ? await db.select().from(customTags).where(inArray(customTags.id, tagIds))
        : [];

    // Create a map of tagId -> tag
    const tagMap = new Map(allTags.map((tag) => [tag.id, tag]));

    // Create a map of placeId -> tags
    const placeTagsMap = new Map<number, (typeof customTags.$inferSelect)[]>();
    for (const relation of placeIdTagRelations) {
      const tag = tagMap.get(relation.tagId);
      if (tag) {
        if (!placeTagsMap.has(relation.placeId)) {
          placeTagsMap.set(relation.placeId, []);
        }
        placeTagsMap.get(relation.placeId)!.push(tag);
      }
    }

    // Combine places with their tags
    const placesIdWithTags = allPlacesId.map((place) => ({
      ...place,
      tags: placeTagsMap.get(place.id) || [],
    }));

    return c.json(
      {
        success: true,
        data: placesIdWithTags,
      },
      200
    );
  } catch (error) {
    console.error('Error fetching places:', error);
    return c.json(
      {
        success: false,
        error: 'Failed to fetch places',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
});

// Get a single place by ID with its tags
api.get('/places/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    if (isNaN(id)) {
      return c.json(
        {
          success: false,
          error: 'Invalid place ID',
        },
        400
      );
    }

    const [place] = await db.select().from(places).where(eq(places.id, id));

    if (!place) {
      return c.json(
        {
          success: false,
          error: 'Place not found',
        },
        404
      );
    }

    // Get tags for this place
    const placeTagRelations = await db.select().from(placeTags).where(eq(placeTags.placeId, id));

    const tagIds = placeTagRelations.map((relation) => relation.tagId);

    const tags =
      tagIds.length > 0
        ? await db.select().from(customTags).where(inArray(customTags.id, tagIds))
        : [];

    const placeWithTags = {
      ...place,
      tags,
    };

    return c.json(
      {
        success: true,
        data: placeWithTags,
      },
      200
    );
  } catch (error) {
    console.error('Error fetching place:', error);
    return c.json(
      {
        success: false,
        error: 'Failed to fetch place',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
});
// Store a new placeID and tags
api.post('/places', async (c) => {
  try {
    const body: { placeId: string; tags?: { name: string }[] } = await c.req.json();

    // Validate required fields
    if (!body.placeId) {
      return c.json(
        {
          success: false,
          error: 'Place id is required',
        },
        400
      );
    }
    // Get existing place with the same name
    const existingPlaceId = await db
      .select()
      .from(placesId)
      .where(eq(placesId.placeId, body.placeId));
    if (existingPlaceId.length > 0) {
      c.status(409);
      throw new HTTPException(409, { message: 'Ce spot a déjà été rajouté', cause: 'duplicate' });
    }

    // Insert the place into the database
    const [newPlace] = await db
      .insert(placesId)
      .values({
        placeId: body.placeId,
      })
      .returning();

    // Handle tags if provided
    if (body.tags && body.tags.length > 0) {
      // Extract tag names from the array of objects
      const tagNames = body.tags.map((tag) => tag.name);

      // Get existing tags
      const existingTags = await db
        .select()
        .from(customTags)
        .where(inArray(customTags.name, tagNames));

      const existingTagNames = existingTags.map((tag) => tag.name);
      const existingTagIds = existingTags.map((tag) => tag.id);

      // Find new tags that don't exist yet
      const newTagNames = tagNames.filter((tagName) => !existingTagNames.includes(tagName));

      // Insert new tags
      let newTagIds: number[] = [];
      if (newTagNames.length > 0) {
        const insertedTags = await db
          .insert(customTags)
          .values(newTagNames.map((name) => ({ name })))
          .returning();
        newTagIds = insertedTags.map((tag) => tag.id);
      }

      // Combine all tag IDs
      const allTagIds = [...existingTagIds, ...newTagIds];

      // Create place-tag relationships
      if (allTagIds.length > 0) {
        await db.insert(placeTags).values(
          allTagIds.map((tagId) => ({
            placeId: newPlace.id,
            tagId,
          }))
        );
      }
    }

    return c.json(
      {
        success: true,
        data: newPlace,
      },
      201
    );
  } catch (error) {
    console.error('Error creating place:', error);
    return c.json({
      success: false,
      error: 'Failed to create place',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default api;
