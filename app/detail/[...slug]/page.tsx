'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { fetchViewPhones } from '@/lib/data'
import classNames from 'classnames'

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
    fetchViewPhones(phone_id).then((data) => setdata(data))
  }, [phone_id])

  const deduction = [200, 1000, 7300, 100, 4000, 800, 7, 70, 900]
  const maxPrice = 10000
  const minPrice = 100
  const calPrice = (maxPrice: number, deduction: number[]) => {
    let price = maxPrice
    let i = 0
    while (price > minPrice && i < deduction.length) {
      price -= deduction[i]
      i++
    }
    return price > minPrice ? price : minPrice
  }
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
      id === 10
        ? [{ id, name }]
        : prev.some((item) => item.id === id)
          ? prev.filter((item) => item.id !== id)
          : [...prev, { id, name }]
    )
  }

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-slate-200 p-2">
      {defectsCategory.map((item, index) => {
        const isOpen = openModal.find((modal) => modal.id === index)?.state
        return (
          <Fragment key={index}>
            <div
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={() => handleToggleModal(index)}>
              <p>{item.defect_category} </p>
              <p className="text-xs text-yellow-500">
                {index === defectsCategory.length - 1
                  ? multiSelected.some((item) => item.id === 10)
                    ? 'ไม่มีปัญหา'
                    : multiSelected.length === 0
                      ? ''
                      : ` มี ${multiSelected.map((item) => item.name).length} ข้อ`
                  : selected
                      .filter((item) => item.modal_id === index)
                      .map((item) => item.name)
                      .join(', ')}
              </p>
            </div>
            {isOpen && (
              <div className="grid max-h-96 w-full grid-cols-1 gap-2 pt-2 opacity-100 md:grid-cols-3">
                {defectChoice
                  .filter((defect) => defect.defect_id === item.defect_id)
                  .map((defect, idx) => (
                    <div key={idx} className="flex w-full gap-4">
                      {index === defectsCategory.length - 1 ? (
                        <button
                          className={classNames(
                            'flex w-full rounded-md border bg-white p-1 hover:border-yellow-500 hover:bg-yellow-50 md:justify-center',
                            selected.some((item) => item.id === Number(defect.choice_id))
                              ? 'border-yellow-500 bg-yellow-50'
                              : ''
                          )}
                          onClick={() => {
                            multiToggleSelected(idx, defect.defect_choice)
                          }}>
                          {defect.defect_choice}
                        </button>
                      ) : (
                        <button
                          className="flex w-full rounded-md border bg-white p-1 hover:border-yellow-500 hover:bg-yellow-50 md:justify-center"
                          onClick={() => {
                            handleToggleSelected(index, idx, defect.defect_choice)
                          }}>
                          {defect.defect_choice}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default Detail
