import Sellgoods from '@/constants/sellgoods'
import React, { Fragment } from 'react'

const SellGoodsSection: React.FC = () => {
  return (
    <Fragment>
      {Sellgoods.map((name, i) => (
        <div key={i} className="flex flex-col gap-4 md:px-40 py-10  ">
          <p className="flex justify-center text-2xl font-bold">{name.name} </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {name.details.map((item, idx) => (
              <div key={idx} className="flex justify-center gap-4">
                <div className="flex w-24 justify-center  items-center ">
                  <img src="https://placehold.co/40x40" className="rounded-full" />
                </div>
                <div className="flex w-full flex-col">
                  <p className='text-sm font-bold'>{item.header} </p>
                  <p className='text-xs'>{item.description} </p>
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
