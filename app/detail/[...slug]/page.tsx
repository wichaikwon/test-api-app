'use client'
import React, { Fragment, use, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { fetchFinalPrice, fetchViewPhones } from '@/lib/data'
import DefectCategory from '@/app/components/DefectCategory'
import { useForm } from 'react-hook-form'

type FormValue = {
  selectedIds: number[]
}
const Detail: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split(`/`).filter(Boolean)
  const editIndex = parts.indexOf('detail')
  const router = useRouter()
  const [finalPrice, setFinalPrice] = useState<{ final_price: number } | null>(null)
  const [openModal, setOpenModal] = useState<{ id: number; state: boolean }[]>([])
  const [selected, setSelected] = useState<{ modal_id: number; id: number; name: string }[]>([])
  const [multiSelected, setMultiSelected] = useState<{ id: number; name: string }[]>([])
  if (editIndex === -1 || parts.length < editIndex + 1) {
    return <p className="text-red-500">Invalid URL</p>
  }
  const phone_id = parts[editIndex + 1]
  const [data, setdata] = useState<any[]>([])
  const { register, handleSubmit, setValue } = useForm<FormValue>()

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
      setValue('selectedIds', [...selected.map((m) => m.id), ...updated.map((s) => s.id)])
      return updated
    })
  }

  const onSubmit = handleSubmit((data) => {
    fetchFinalPrice(phone_id, data.selectedIds.map(String)).then((data) => setFinalPrice(data))
    setTimeout(() => {
      if (finalPrice) {
        router.push(
          `/trading_channel/${phone_id}/${selected.map((item) => item.id).join('/')}/${multiSelected.map((item) => item.id).join('/')}/${finalPrice.final_price}`
        )
      }
    }, 300)
  })
  return (
    <Fragment>
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
      <button
        onClick={() => {
          onSubmit()
        }}
        className="mt-2 flex w-full justify-center rounded-md bg-yellow-400 p-2 hover:bg-yellow-300">
        ประเมินราคา
      </button>
    </Fragment>
  )
}

export default Detail
