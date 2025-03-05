import React, { Fragment } from 'react'
import info from '@/constants/info'
const InfoSection: React.FC = () => {
  return (
    <Fragment>
      {info.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-4  items-center my-10 lg:my-20 justify-center">
          <p className="w-80 text-center text-2xl md:w-full">{item.name}</p>
          <div className="grid w-9/12 grid-cols-1 md:grid-cols-3">
            {item.details.map((detail, i) => (
              <div className="flex flex-col gap-2" key={i}>
                <div className="flex justify-center">
                  <img src="http://placehold.co/120x120" className="w-40 rounded-full" />
                </div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <p className="rounded-full bg-yellow-400 px-2.5 text-xl text-white">{i + 1}</p>
                  <p className="text-xl font-bold">{detail.header}</p>
                </div>
                <p>{detail.description} </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default InfoSection
