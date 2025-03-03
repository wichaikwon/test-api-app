'use client'

import { fetchViewPhones } from '@/lib/data'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateDeductionsInBackend } from './action'

interface PhoneData {
  brand_id: string
  model_id: string
  capacity_id: string
  price: number
  min_price : number
  defect_id: string
  defect_category: string
  defect_choice: string
  brand_name: string
  model_name: string
  capacity_value: string
  choice_id: string
  deduction: number
}

const EditPage: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split(`/`).filter(Boolean)
  const editIndex = parts.indexOf('edit')
  
  if (editIndex === -1 || parts.length < editIndex + 4) {
    return <p className="text-red-500">Invalid URL</p>
  }
  
  const phone_id = parts[editIndex + 1]

  const [data, setData] = useState<PhoneData[]>([])
  const [deductions, setDeductions] = useState<Record<string, number>>({})

  const handleChange = (id: string, value: number) => {
    setDeductions((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const uniqueValue = Array.from(new Map(data.map(item => [item.brand_id + item.model_id + item.capacity_id, item])).values())
  const defectsCategory = Array.from(new Map(data.map(item => [item.defect_id, item])).values())

  const defectChoice = data.reduce(
    (acc: { defect_id: string; choice_id: string; defect_choice: string; deduction: number }[], item) => {
      acc.push({
        choice_id: item.choice_id,
        defect_id: item.defect_id,
        defect_choice: item.defect_choice,
        deduction: item.deduction,
      })
      return acc
    },
    [] as { defect_id: string; choice_id: string; defect_choice: string; deduction: number }[]
  )
  useEffect(() => {
    fetchViewPhones(phone_id).then(setData)
  }, [phone_id]) 

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end">
        <button
          onClick={async () => await updateDeductionsInBackend(Number(phone_id), deductions)}
          className="bg-green-400 p-2 rounded-md text-white hover:bg-green-500"
        >
          Save
        </button>
      </div>

      {uniqueValue.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          {['ยี่ห้อ', 'รุ่น', 'ความจุ', 'ราคา','ราคาต่ำสุด'].map((label, i) => (
            <div key={i} className="flex items-center gap-4">
              <p className="w-16">{label} : </p>
              <input
                className="w-full rounded-md border p-2"
                placeholder={
                  label === 'ยี่ห้อ'
                    ? item.brand_name
                    : label === 'รุ่น'
                    ? item.model_name
                    : label === 'ความจุ'
                    ? item.capacity_value
                    : label === 'ราคา'
                    ? String(item.price)
                    : label === 'ราคาต่ำสุด'
                    ? String(item.min_price)
                    : ''
                }
                value={
                  label === 'ยี่ห้อ'
                    ? item.brand_name
                    : label === 'รุ่น'
                    ? item.model_name
                    : label === 'ความจุ'
                    ? item.capacity_value
                    : label === 'ราคา'
                    ? item.price
                    : label === 'ราคาต่ำสุด'
                    ? item.min_price
                    : ''
                }
                disabled
              />
            </div>
          ))}
        </div>
      ))}

      {defectsCategory.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="w-full rounded-md border bg-slate-200 p-4">
            <p className="border-black pb-2 text-3xl">{item.defect_category}</p>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
              {defectChoice.map(
                (choice, idx) =>
                  choice.defect_id === item.defect_id && (
                    <div key={idx} className="flex w-full flex-col">
                      <p className="w-full">{choice.defect_choice}</p>
                      <input
                        type="number"
                        value={deductions[choice.choice_id] ?? choice.deduction}
                        onChange={(e) => handleChange(choice.choice_id, Number(e.target.value))}
                        className="rounded-md border p-2"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EditPage
