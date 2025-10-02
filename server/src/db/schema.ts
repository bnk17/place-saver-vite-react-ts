import {
  pgTable,
  text,
  varchar,
  numeric,
  real,
  json,
  serial,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const places = pgTable('places', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  adress: text('adress').notNull(),
  additionnalInfo: text('additionnal_info'),
  imgSrc: text('img_src'),
  placeId: varchar('place_id', { length: 255 }),
  lat: real('lat'),
  lng: real('lng'),
  rating: numeric('rating', { precision: 2, scale: 1 }),
  website: text('website'),
  phoneNumber: varchar('phone_number', { length: 50 }),
  googlePhotos: json('google_photos').$type<string[]>(),
  googleMapsUrl: text('google_maps_url'),
});

// Tags table
export const customTags = pgTable('custom_tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // Added unique constraint
});

// Join table: place <-> tag (many-to-many)
export const placeTags = pgTable(
  'place_tags',
  {
    placeId: integer('place_id')
      .notNull()
      .references(() => places.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => customTags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.placeId, table.tagId] }),
  })
);
