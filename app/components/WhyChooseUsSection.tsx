import WhyChooseUs from '@/constants/whychooseus'
import React, { Fragment } from 'react'

const WhyChooseUsSection: React.FC = () => {
  return (
    <Fragment>
      {WhyChooseUs.map((name, i) => (
        <div key={i} className="flex flex-col gap-4 items-center justify-center px-40 bg-[url('https://placehold.co/2000x400/orange/white')]">
          <p className='text-2xl font-bold'>{name.name} </p>
          <div className="flex w-full justify-center gap-4">
            <div className="grid grid-cols-2 gap-2">
              {name.details.map((item, idx) => (
                <div key={idx} className="flex gap-2 w-full">
                  <div className='w-40'>
                    <img src="https://placehold.co/100x100" className='rounded-full' />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className='text-xl font-bold'> {item.header}</p>
                    <p>{item.description} </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full">
              <img src="https://placehold.co/200x400" />
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default WhyChooseUsSection
