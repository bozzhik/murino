'use client'

import {useState} from 'react'
import {ArrowLeft} from 'lucide-react'

import Heading from '#/UI/Heading'
import {ModuleButton} from '##/reservation/ModuleButton'
import Content from '##/reservation/ModuleContent'

export default function ReservationModule() {
  const [step, setStep] = useState(1)
  const [fieldSize, setFieldSize] = useState('')
  const [fieldCount, setFieldCount] = useState(1)
  const [duration, setDuration] = useState(60)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [personalInfo, setPersonalInfo] = useState({name: '', consent: false})

  const goBack = () => setStep(step > 1 ? step - 1 : step)
  const goNext = () => setStep(step < 7 ? step + 1 : step)

  const dataFields = {
    size: {
      label: 'Размер поля',
      data: fieldSize,
    },
    count: {
      label: 'Количество полей',
      data: fieldCount,
    },
    duration: {
      label: 'Длительность',
      data: duration / 60,
    },
    date: {
      label: 'Дата',
      data: date,
    },
    time: {
      label: 'Время',
      data: time,
    },
    info: {
      label: 'Плательщик',
      data: personalInfo.name,
    },
  }

  const steps = [
    {
      title: 'Выберите размер поля',
      content: (
        <Content>
          <ModuleButton
            onClick={() => {
              setFieldSize('20x40')
              goNext()
            }}
          >
            20x40
          </ModuleButton>
          <ModuleButton
            onClick={() => {
              setFieldSize('40x70')
              goNext()
            }}
          >
            40x70
          </ModuleButton>
        </Content>
      ),
    },
    {
      title: 'Выберите количество полей',
      content: (
        <Content>
          {[1, 2, 3].map((count) => (
            <ModuleButton
              key={count}
              onClick={() => {
                setFieldCount(count)
                goNext()
              }}
            >
              {count}
            </ModuleButton>
          ))}
        </Content>
      ),
    },
    {
      title: 'Выберите продолжительность игры',
      content: (
        <Content>
          {[120, 180, 240].map((d) => (
            <ModuleButton
              key={d}
              onClick={() => {
                setDuration(d)
                goNext()
              }}
            >
              {d / 60} ЧАСА
            </ModuleButton>
          ))}
        </Content>
      ),
    },
    {
      title: 'Выберите дату',
      content: (
        <Content>
          <input className="px-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <ModuleButton onClick={goNext}>Далее</ModuleButton>
        </Content>
      ),
    },
    {
      title: 'Выберите временной интервал',
      content: (
        <Content>
          <input className="px-2" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <ModuleButton onClick={goNext}>Далее</ModuleButton>
        </Content>
      ),
    },
    {
      title: 'Ввод персональных данных',
      content: (
        <Content direction="col">
          <input type="text" placeholder="Ваше Имя" value={personalInfo.name} onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})} />
          <label>
            <input type="checkbox" checked={personalInfo.consent} onChange={(e) => setPersonalInfo({...personalInfo, consent: e.target.checked})} />
            Согласие на обработку персональных данных
          </label>
          <ModuleButton onClick={goNext}>Далее</ModuleButton>
        </Content>
      ),
    },
    {
      title: 'Детали бронирования',
      content: (
        <Content direction="col" className="gap-4 xl:gap-3 sm:gap-3">
          <div className="p-5 sm:p-4 space-y-5 sm:space-y-4 shadow-card rounded-small sm:rounded-smallest">
            {Object.entries(dataFields).map(([key, {label, data}]) => (
              <div key={key} className="flex items-center justify-between text-3xl xl:text-2xl sm:text-lg !leading-none font-book text-custom-gray">
                <span>{label}:</span>

                <div className="text-center w-1/2 sm:w-1/3 text-custom-95 rounded-smallest">{data}</div>
              </div>
            ))}
          </div>

          <ModuleButton onClick={() => alert('Redirecting to payment...')}>Перейти к оплате</ModuleButton>
        </Content>
      ),
    },
  ]

  return (
    <section data-section="form-reservation" className="w-[40%] sm:w-full p-3 sm:p-2.5 space-y-5 shadow-card rounded-small">
      {step > 1 ? (
        <div className="flex justify-between gap-2">
          <ModuleButton onClick={goBack} className="grid px-6 xl:px-4 !py-0 w-fit place-items-center">
            <ArrowLeft className="s-9 xl:s-7" />
          </ModuleButton>
          <Heading size="full" className="w-full" text={steps[step - 1].title} />
        </div>
      ) : (
        <Heading size="full" text={steps[step - 1].title} />
      )}

      {steps[step - 1].content}
    </section>
  )
}
