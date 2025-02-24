'use client'

import { createContext } from 'react'

interface FooterAdminContextProps {}

export const FooterAdminContext = createContext<FooterAdminContextProps>({})
interface FooterAdminProviderProps {
  children: React.ReactNode
}
export const FooterAdminContextProvider = ({ children }: FooterAdminProviderProps) => {
  return (
    <FooterAdminContext.Provider value={{}}>
      {children}
      <div className='fixed bottom-0 w-full z-10'>footer</div>
    </FooterAdminContext.Provider>
  )
}
