import {createSlot} from '@/db/queries'
import {InsertSlot} from '@/db/schema'

async function seed() {
  const slots: InsertSlot[] = [
    {
      token: 'slot1',
      fieldCount: 1,
      startsAt: new Date('2024-09-10T10:00:00Z'),
      finishesAt: new Date('2024-09-10T11:00:00Z'),
    },
    {
      token: 'slot2',
      fieldCount: 2,
      startsAt: new Date('2024-09-10T11:00:00Z'),
      finishesAt: new Date('2024-09-10T12:00:00Z'),
    },
    {
      token: 'slot3',
      fieldCount: 3,
      startsAt: new Date('2024-09-10T12:00:00Z'),
      finishesAt: new Date('2024-09-10T13:00:00Z'),
    },
  ]

  for (const slot of slots) {
    await createSlot(slot)
  }
  process.exit()
}

seed()
