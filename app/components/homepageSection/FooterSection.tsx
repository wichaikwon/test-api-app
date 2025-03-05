import Footer from '@/constants/footer'
import Link from 'next/link'
import React, { Fragment } from 'react'

const FooterSection: React.FC = () => {
  return (
    <Fragment>
      {Footer.map((item, i) => (
        <div key={i} className="flex flex-col items-start gap-2 px-10 pt-4 lg:px-60 ">
          <img src={item.image} />
          <div className="flex justify-center text-lg font-bold">{item.title1}</div>
          <div className="flex justify-center text-lg font-bold">{item.title2}</div>
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex w-full flex-col gap-4 lg:w-6/12">
              {item.description.map((desc, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p className="text-left">{desc.description1}</p>
                  <p className="text-left">{desc.description2}</p>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-start lg:w-6/12 lg:justify-center">
              <div className="grid grid-cols-2 justify-center gap-8 w-full lg:w-fit">
                <div className="flex min-w-max flex-col justify-start gap-2 lg:items-start">
                  <p className="font-bold">{item.title3}</p>
                  {item.items1.map((subItem, index) => (
                    <a key={index} href={subItem.link} className="text-sm">
                      {subItem.title}
                    </a>
                  ))}
                </div>
                <div className="flex min-w-max flex-col justify-start gap-2 lg:items-start">
                  <p className="font-bold">{item.title4}</p>
                  {item.items2.map((subItem, index) => (
                    <a key={index} href={subItem.link} className="text-sm">
                      {subItem.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-10">
            <p>ติดต่อข่าวสาร</p>
            <div className="flex gap-2">
              <input className="w-40 rounded-md border p-1.5 text-xs" placeholder="Your Email" />
              <button className="-ml-4 rounded-md bg-yellow-400 p-1.5 text-xs">GO</button>
            </div>
            <div className="flex gap-2 pt-4">
              <img src="https://placehold.co/24x24" className="rounded-full" />
              <button className="hover:text-slate-500">
                <Link href="tel:081-234-5678"> 081-234-5678</Link>
              </button>
            </div>
            <div className="flex gap-2">
              <img src="https://placehold.co/24x24" className="rounded-full" />
              <button className="hover:text-slate-500">
                <Link href="mailto:email@email.com">email@email.com</Link>
              </button>
            </div>
            <div className="mt-10 flex gap-4">
              {[
                'https://placehold.co/24x24',
                'https://placehold.co/24x24',
                'https://placehold.co/24x24',
                'https://placehold.co/24x24',
              ].map((src, index) => (
                <button key={index}>
                  <Link href="#">
                    <img src={src} className="rounded-full" />
                  </Link>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default FooterSection
