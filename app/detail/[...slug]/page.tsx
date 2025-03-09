'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { fetchFinalPrice, fetchViewPhones } from '@/lib/data'
import DefectCategory from '@/app/components/DefectCategory'
import { useForm } from 'react-hook-form'

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
  const [data, setData] = useState<{ defect_id: string; choice_id: string; defect_choice: string; deduction: number }[]>([])
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { selectedIds: [] as number[] },
  })
  useEffect(() => {
    setOpenModal([{ id: 0, state: true }])
    fetchViewPhones(phone_id).then((data) => setData(data))
  }, [phone_id])
  useEffect(() => {
    setValue(
      'selectedIds',
      [...selected.map((s) => s.id), ...multiSelected.map((m) => m.id)]
    )
  }, [selected, setValue])

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
      const updated =
        modal_id === defectsCategory.length
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

      setValue('selectedIds', [...multiSelected.map((m) => m.id), ...updated.map((s) => s.id)])
      return updated
    })
  }
  const multiToggleSelected = (id: number, name: string) => {
    setMultiSelected((prev) => {
      const updated =
        id === 35
          ? [{ id, name }]
          : prev.some((item) => item.id === 35)
            ? [...prev.filter((item) => item.id !== 35), { id, name }]
            : prev.some((item) => item.id === id)
              ? prev.filter((item) => item.id !== id)
              : [...prev, { id, name }]

      setValue('selectedIds', [...selected.map((s) => s.id), ...updated.map((m) => m.id)])
      return updated
    })
  }
  const onSubmit = (data: { selectedIds: number[] }) => {
    fetchFinalPrice(phone_id, data.selectedIds.map(String)).then((data) => console.log(data))
  } 
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <input type="hidden" {...register('selectedIds')} />

        <button
          type="submit"
          className="mt-2 flex w-full justify-center rounded-md bg-yellow-400 p-2 hover:bg-yellow-300">
          ประเมินราคา
        </button>
      </form>
    </Fragment>
  )
}

export default Detail
