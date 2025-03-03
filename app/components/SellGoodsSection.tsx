import Sellgoods from '@/constants/sellgoods'
import React, { Fragment } from 'react'

const SellGoodsSection: React.FC = () => {
  return (
    <Fragment>
      {Sellgoods.map((name, i) => (
        <div key={i} className="flex flex-col gap-4 px-40">
          <p className="flex justify-center text-2xl font-bold">{name.name} </p>
          <div className="grid grid-cols-4">
            {name.details.map((item, idx) => (
              <div key={idx} className="flex justify-center gap-4">
                <div className="flex w-full justify-end">
                  <img src="https://placehold.co/40x40" className="rounded-full" />
                </div>
                <div className="flex w-full flex-col">
                  <p className='text-lg'>{item.header} </p>
                  <p>{item.description} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default SellGoodsSection
