'use client'
import Faq from '@/constants/faq'
import React, { Fragment, useState } from 'react'

const FaqSection: React.FC = () => {
  const [openModal, setOpenModal] = useState<{ id: number; open: boolean }[]>([])

  const toggleModal = (id: number) => {
    const index = openModal.findIndex((item) => item.id === id)
    if (index === -1) {
      setOpenModal([...openModal, { id, open: !openModal }])
    } else {
      const copy = [...openModal]
      copy[index].open = !copy[index].open
      setOpenModal(copy)
    }
  }
  return (
    <Fragment>
      {Faq.map((name, i) => (
        <div key={i} className="flex flex-col gap-4 bg-slate-200 px-10 md:py-20 py-10">
          <p className="flex justify-center text-2xl font-bold">{name.name}</p>
          <div className="flex flex-col gap-4">
            {name.details.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2 lg:px-20" onClick={() => toggleModal(idx)}>
                <div className='flex justify-between items-center border-b border-slate-400'>
                  <button className="text-left font-bold w-11/12">{item.header}</button>
                  <button >v</button>
                </div>
                <div
                  className={`transition-max-height overflow-hidden duration-500 ease-in-out w-11/12 ${
                    openModal.find((modal) => modal.id === idx)?.open ? 'max-h-96' : 'max-h-0'
                  }`}>
                  <p className="text-left text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default FaqSection
