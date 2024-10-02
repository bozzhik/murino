import {pgTable, integer, text, timestamp} from 'drizzle-orm/pg-core'

export const slotsTable = pgTable('slots', {
  token: text('token').notNull().unique(),
  fieldCount: integer('field_count').notNull(),
  startsAt: timestamp('starts_at').notNull(),
  finishesAt: timestamp('finishes_at').notNull(),
})

export type InsertSlot = typeof slotsTable.$inferInsert
export type FindSlot = typeof slotsTable.$inferSelect
