'use client'
import { fetchViewPhones } from '@/lib/data'
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useMemo, useState } from 'react'

const TradingChannel: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split(`/`).filter(Boolean)
  const editIndex = parts.indexOf('trading_channel')
  const [data, setData] = useState<any[]>([])
  const phone_id = parts[editIndex + 1]
  if (editIndex === -1) {
    return <p className="text-red-500">Invalid URL</p>
  }
  const [ids, setIds] = useState<String[]>([])
  useEffect(() => {
    setIds(parts.filter((_, index) => index !== editIndex && index !== editIndex + 1).map((item) => item))
    fetchViewPhones(phone_id).then((data) => setData(data))
  }, [])

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
  const filteredChoices = useMemo(() => {
    return defectChoice.filter((choice) => ids.includes(choice.choice_id.toString()))
  }, [defectChoice, ids])
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p>{parts[parts.length - 1]}</p>
      <div className="flex w-2/12">
        <p className='text-xs'>
          {filteredChoices.map((choice) => (
            <Fragment key={choice.choice_id}>{choice.defect_choice} /</Fragment>
          ))}
        </p>
      </div>
    </div>
  )
}

export default TradingChannel
