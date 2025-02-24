'use client'
import { createContext, useState } from 'react'

interface LayoutAdminContextProps {
}

export const LayoutAdminContext = createContext<LayoutAdminContextProps>({
})

interface LayoutAdminProviderProps {
  children: React.ReactNode
}

export const LayoutAdminContextProvider = ({ children }: LayoutAdminProviderProps) => {
  return <LayoutAdminContext.Provider value={{}}>
    <div className='flex w-full h-full'>
        {children}
    </div>
  </LayoutAdminContext.Provider>
}
