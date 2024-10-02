import {db} from '@/db/drizzle'
import {InsertSlot, FindSlot, slotsTable} from '@/db/schema'

export async function createSlot(data: InsertSlot) {
  await db.insert(slotsTable).values(data)
}

export async function getSlots() {
  const data: FindSlot[] = await db.select().from(slotsTable)
  return data
}
