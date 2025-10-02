import { Hono } from 'hono';
import { db } from '../db/db';
import { customTags, places, placeTags } from '../db/schema';
import { eq, inArray } from 'drizzle-orm';

const api = new Hono();

// Create a new place
api.post('/places', async (c) => {
  try {
    const body: typeof places.$inferInsert & { tags?: string[] } = await c.req.json();

    // Validate required fields
    if (!body.name || !body.adress) {
      return c.json(
        {
          success: false,
          error: 'Name and address are required',
        },
        400
      );
    }

    // Insert the place into the database
    const [newPlace] = await db
      .insert(places)
      .values({
        name: body.name,
        adress: body.adress,
        additionnalInfo: body.additionnalInfo || null,
        imgSrc: body.imgSrc || null,
        placeId: body.placeId || null,
        lat: body.lat || null,
        lng: body.lng || null,
        rating: body.rating || null,
        website: body.website || null,
        phoneNumber: body.phoneNumber || null,
        googlePhotos: body.googlePhotos || null,
        googleMapsUrl: body.googleMapsUrl || null,
      })
      .returning();

    // Handle tags if provided
    if (body.tags && body.tags.length > 0) {
      // Get existing tags
      const existingTags = await db
        .select()
        .from(customTags)
        .where(inArray(customTags.name, body.tags));

      const existingTagNames = existingTags.map((tag) => tag.name);
      const existingTagIds = existingTags.map((tag) => tag.id);

      // Find new tags that don't exist yet
      const newTagNames = body.tags.filter((tagName) => !existingTagNames.includes(tagName));

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
    return c.json(
      {
        success: false,
        error: 'Failed to create place',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
});

export default api;
