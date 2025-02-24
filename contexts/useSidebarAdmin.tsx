'use client'
import { createContext } from 'react'

interface SidebarAdminContextProps {}

export const SidebarAdminContext = createContext<SidebarAdminContextProps>({})
interface SidebarAdminProviderProps {
  children: React.ReactNode
}
export const SidebarAdminContextProvider = ({ children }: SidebarAdminProviderProps) => {
  return (
    <SidebarAdminContext.Provider value={{}}>
    <div className='flex flex-col bg-slate-100 h-screen p-4'>
      <p>Admin Page</p>
      <hr className='divide-x' />
      <div>
        <button >Brands</button>
      </div>
<div>
    
</div>
    </div>
      {children}
    </SidebarAdminContext.Provider>
  )
}
