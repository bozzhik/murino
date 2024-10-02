CREATE TABLE IF NOT EXISTS "slots" (
	"token" text NOT NULL,
	"field_count" integer NOT NULL,
	"starts_at" timestamp NOT NULL,
	"finishes_at" timestamp NOT NULL,
	CONSTRAINT "slots_token_unique" UNIQUE("token")
);
