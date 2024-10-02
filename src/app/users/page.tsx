import {getSlots} from '@/db/queries'

export default async function SlotsPage() {
  const slots = await getSlots()

  return (
    <section className="space-y-2 m-5">
      <mark className="bg-custom-green text-white text-xl px-2 py-1">Slots:</mark>

      <div className="w-fit border-2 border-custom-green divide-y-[1px] divide-custom-green p-2">
        {slots.map((slot: {token: string; fieldCount: number; startsAt: Date; finishesAt: Date}) => (
          <div key={slot.token} className="p-2">
            {Object.entries(slot).map(([key, value]) => (
              <p key={key}>{key}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
