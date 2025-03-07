'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { fetchViewPhones } from '@/lib/data'
import classNames from 'classnames'
import DefectCategory from '@/app/components/DefectCategory'

const Detail: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split(`/`).filter(Boolean)
  const editIndex = parts.indexOf('detail')
  const [openModal, setOpenModal] = useState<{ id: number; state: boolean }[]>([])
  const [selected, setSelected] = useState<{ modal_id: number; id: number; name: string }[]>([])
  const [multiSelected, setMultiSelected] = useState<{ id: number; name: string }[]>([])
  if (editIndex === -1 || parts.length < editIndex + 1) {
    return <p className="text-red-500">Invalid URL</p>
  }
  const phone_id = parts[editIndex + 1]
  const [data, setdata] = useState<any[]>([])

  useEffect(() => {
    setOpenModal([{ id: 0, state: true }])
    fetchViewPhones(phone_id).then((data) => setdata(data))
  }, [phone_id])

  
  const defectsCategory = Array.from(new Map(data.map((item) => [item.defect_id, item])).values())
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
  const handleToggleModal = (id: number) => {
    setOpenModal((prev) =>
      prev.some((modal) => modal.id === id)
        ? prev.map((modal) => (modal.id === id ? { ...modal, state: !modal.state } : modal))
        : [...prev, { id, state: true }]
    )
  }
  const handleToggleSelected = (modal_id: number, id: number, name: string) => {
    setSelected((prev) => {
      return modal_id === defectsCategory.length - 1
        ? id === 10
          ? prev.some((item) => item.id === id)
            ? prev
            : [{ modal_id, id, name }]
          : prev.some((item) => item.id === id)
            ? prev.filter((item) => item.id !== id)
            : [...prev, { modal_id, id, name }]
        : prev.some((item) => item.modal_id === modal_id && item.id === id)
          ? prev
          : [...prev.filter((item) => item.modal_id !== modal_id), { modal_id, id, name }]
    })
  }
  const multiToggleSelected = (id: number, name: string) => {
    setMultiSelected((prev) => 
      id === 35
      ? [{ id, name }]
      : prev.some((item) => item.id === 35)
        ? [...prev.filter((item) => item.id !== 35), { id, name }]
        : prev.some((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, name }]
    )
  }
  console.log('selected', selected, 'multiSelected', multiSelected)
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-slate-200 p-2">
      {defectsCategory.map((item, index) => {
        const isOpen = openModal.find((modal) => modal.id === index)?.state
        return (
          <DefectCategory
            key={index}
            item={item}
            index={index}
            isOpen={isOpen ?? false}
            handleToggleModal={handleToggleModal}
            handleToggleSelected={handleToggleSelected}
            multiToggleSelected={multiToggleSelected}
            defectChoice={defectChoice}
            defectsCategory={defectsCategory}
            selected={selected}
            multiSelected={multiSelected}
          />
        )
      })}
    </div>
  )
}

export default Detail
