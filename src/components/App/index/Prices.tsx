'use client'

import {cn} from '@/lib/utils'
import {useState} from 'react'
import Button, {buttonVariants} from '#/UI/Button'

interface FieldButton {
  fieldSize: string
  label: string
}

const generateFieldButtons = (sizes: string[]): FieldButton[] => {
  return sizes.map((size) => ({fieldSize: size, label: size}))
}

const fieldSizes = ['20x40', '40x70']
const fieldButtons: FieldButton[] = generateFieldButtons(fieldSizes)

interface ScheduleItem {
  time: string
  price: string
}

interface PriceCategory {
  title: string
  schedule: ScheduleItem[]
}

const priceData: Record<string, Record<string, PriceCategory>> = {
  '20x40': {
    1: {
      title: 'БУДНИЕ ДНИ',
      schedule: [
        {time: '07:00 - 14:00', price: '3000 РУБ'},
        {time: '14:00 - 17:00', price: '4300 РУБ'},
        {time: '17:00 - 23:00', price: '5500 РУБ'},
        {time: '23:00 - 07:00', price: '3500 РУБ'},
      ],
    },
    2: {
      title: 'ВЫХОДНЫЕ ДНИ',
      schedule: [{time: 'Весь день', price: '4000 РУБ'}],
    },
  },
  '40x70': {
    1: {
      title: 'БУДНИЕ ДНИ',
      schedule: [
        {time: '07:00 - 14:00', price: '9000 РУБ'},
        {time: '14:00 - 17:00', price: '12900 РУБ'},
        {time: '17:00 - 23:00', price: '16500 РУБ'},
        {time: '23:00 - 07:00', price: '10500 РУБ'},
      ],
    },
    2: {
      title: 'ВЫХОДНЫЕ ДНИ',
      schedule: [{time: 'Весь день', price: '12000 РУБ'}],
    },
  },
}

export default function Prices() {
  const [selectedField, setSelectedField] = useState('20x40')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')

  const handleFieldSwitch = (fieldSize: string) => {
    setSelectedField(fieldSize)
    setSelectedTime('')
    setSelectedPrice('')
  }

  const handleTimeSelection = (time: string, price: string) => {
    setSelectedTime(time)
    setSelectedPrice(price)
  }

  return (
    <section id="prices" className="pt-10 mt-10 sm:pt-0 sm:sm:mt-14">
      <div className={cn(buttonVariants.base, 'bg-custom-green text-white rounded-smallest sm:py-4', 'mx-3')}>Сколько стоит аренда?</div>

      <div className="flex flex-col gap-10 xl:gap-5 sm:gap-7 mx-auto mt-5 p-7 sm:p-3 sm:w-[92%] w-fit shadow-card rounded-small">
        <div className="flex justify-between gap-4 sm:flex-col sm:gap-2">
          {fieldButtons.map((button) => (
            <button key={button.fieldSize} className={`!px-12 xl:!px-7 sm:py-3 rounded-smallest border-[3px] border-transparent ${buttonVariants.base} ${selectedField === button.fieldSize ? 'bg-custom-gray text-white' : 'text-custom-gray !border-custom-gray'}`} title="switch" onClick={() => handleFieldSwitch(button.fieldSize)}>
              футбольное поле <span className="text-custom-95">{button.label}</span>
            </button>
          ))}
        </div>

        {Object.values(priceData[selectedField]).map((category: PriceCategory, index: number) => (
          <div key={index} className="flex flex-col gap-7 xl:gap-5 sm:gap-3">
            <h1 className="text-3xl font-medium text-center uppercase xl:text-xl text-custom-gray">{category.title}</h1>

            <div className="flex flex-col gap-5 xl:gap-3">
              {category.schedule.map((item: ScheduleItem, itemIndex: number) => (
                <div key={itemIndex} className="flex items-center text-[38px] xl:text-2xl justify-between text-custom-gray">
                  <button
                    className={`sm:text-base w-1/2 py-1 xl:py-2 sm:px-2 duration-200 bg-custom-e4 rounded-smallest ${selectedTime === item.time ? '' : ''}`}
                    onClick={() => {
                      handleTimeSelection(item.time, item.price)
                      console.log(`Выбранный временной слот: ${item.time}, Стоимость: ${item.price} | Футбольное поле: ${selectedField}`)
                    }}
                  >
                    {item.time}
                  </button>
                  <h1 className="sm:text-lg">
                    {item.price}
                    <span className="text-custom-95">/ЧАС</span>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* <button
          className={`!text-white !bg-custom-green duration-200 hover:!bg-transparent hover:!ring-[3px] hover:!ring-custom-green hover:!text-custom-green ${buttonVariants.hero} ${buttonVariants.base}`}
          onClick={() => {
            if (selectedTime && selectedPrice) {
              alert(`Выбранный временной слот: ${selectedTime}, Стоимость: ${selectedPrice} | Футбольное поле: ${selectedField}`)
            } else {
              alert('Пожалуйста, выберите временной слот.')
            }
          }}
        >
          Забронировать
        </button> */}

        <Button variant="hero" href="#contacts" className="text-white bg-custom-green duration-200 hover:bg-transparent hover:ring-[3px] hover:ring-custom-green hover:text-custom-green">
          Забронировать
        </Button>
      </div>
    </section>
  )
}
