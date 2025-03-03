'use client'

import { NavbarContextProvider } from '@/contexts/useNavbar'
import { NavbarAdminContextProvider } from '@/contexts/useNavbarAdmin'
import { usePathname } from 'next/navigation'
import React from 'react'
import Sidebar from './Sidebar'

const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  if (pathname.startsWith('/admin/dashboard')) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <NavbarAdminContextProvider>
            <div className="min-h-0 flex-1 overflow-auto to-white">{children}</div>
          </NavbarAdminContextProvider>
          <nav className="bg-green-500">footer</nav>
        </div>
      </div>
    )
  }

  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <NavbarContextProvider>
          <div className="min-h-0 flex-1 overflow-auto">{children}</div>
        </NavbarContextProvider>
        <nav>footer</nav>
      </div>
    </div>
  )
}

export default NavbarWrapper
