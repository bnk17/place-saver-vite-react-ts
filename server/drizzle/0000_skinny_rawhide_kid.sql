CREATE TABLE "custom_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "place_tags" (
	"place_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "place_tags_place_id_tag_id_pk" PRIMARY KEY("place_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "places" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"adress" text NOT NULL,
	"tags" text,
	"additionnal_info" text,
	"img_src" text,
	"place_id" varchar(255),
	"lat" real,
	"lng" real,
	"rating" numeric(2, 1),
	"website" text,
	"phone_number" varchar(50),
	"google_photos" json,
	"google_maps_url" text
);
--> statement-breakpoint
ALTER TABLE "place_tags" ADD CONSTRAINT "place_tags_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_tags" ADD CONSTRAINT "place_tags_tag_id_custom_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."custom_tags"("id") ON DELETE cascade ON UPDATE no action;