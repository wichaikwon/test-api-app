import WhyChooseUs from '@/constants/whychooseus'
import React, { Fragment } from 'react'

const WhyChooseUsSection: React.FC = () => {
  return (
    <Fragment>
      {WhyChooseUs.map((name, i) => (
        <div key={i} className="flex flex-col gap-4 w-full items-center pt-10 px-2 lg:px-40 justify-center bg-[url('https://placehold.co/2000x400/orange/white')]">
          <p className='text-2xl font-bold'>{name.name} </p>
          <div className="flex w-full flex-col lg:flex-row justify-center gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {name.details.map((item, idx) => (
                <div key={idx} className="flex gap-2 w-full">
                  <div className='w-28 flex items-center  lg:items-start'>
                    <img src="https://placehold.co/100x100" className='rounded-full' />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className='text-xl font-bold'> {item.header}</p>
                    <p>{item.description} </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-center">
              <img src="https://placehold.co/200x400" />
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default WhyChooseUsSection
