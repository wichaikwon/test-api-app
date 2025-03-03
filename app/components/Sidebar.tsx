'use client'

import React, { useEffect, useState } from 'react'

const Sidebar: React.FC = () => {
  const defaultState = localStorage.getItem('__sidebar') ?? 'false'
  const [isOpen, setIsOpen] = useState(defaultState === 'true')

  const toggle = () => {
    setIsOpen(!isOpen)
    localStorage.setItem('__sidebar', (!isOpen).toString())
  }
  useEffect(() => {
    const savedState = localStorage.getItem('__sidebar');
    setIsOpen(savedState === 'true');
  }, []);
  return (
    <div className={`flex min-h-screen flex-col justify-between bg-blue-500 text-xl`}>
      <div>
        <div className="flex items-center gap-2">
          <img src="/next.svg" alt="logo" className="h-10 w-10" />
          {isOpen && <p>name</p>}
        </div>
        <hr />
        <div className="flex items-center gap-2">
          <img src="/next.svg" alt="logo" className="h-10 w-10" />
          {isOpen && <p>brands</p>}
        </div>
        <hr />
        <div className="flex items-center gap-2">
          <img src="/next.svg" alt="logo" className="h-10 w-10" />
          {isOpen && <p>logout</p>}
        </div>
      </div>
      <div>
        <button onClick={toggle}>{isOpen ? '<<' : '>>'}</button>
      </div>
    </div>
  )
}

export default Sidebar
