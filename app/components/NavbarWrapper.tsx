'use client'

import { FooterAdminContextProvider } from '@/contexts/useFooterAdmin'
import { LayoutAdminContextProvider } from '@/contexts/useLayoutAdmin'
import { NavbarContextProvider } from '@/contexts/useNavbar'
import { NavbarAdminContextProvider } from '@/contexts/useNavbarAdmin'
import { SidebarAdminContextProvider } from '@/contexts/useSidebarAdmin'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  // Apply `NavbarAdminContextProvider` for `/admin/dashboard`
  if (pathname.startsWith('/admin/dashboard')) {
    return (
      <LayoutAdminContextProvider>
        <FooterAdminContextProvider>
          <SidebarAdminContextProvider>
            <NavbarAdminContextProvider>{children}</NavbarAdminContextProvider>
          </SidebarAdminContextProvider>
        </FooterAdminContextProvider>
      </LayoutAdminContextProvider>
    )
  }

  // Hide Navbar on all other `/admin/*` pages
  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  // Show regular navbar for non-admin pages
  return <NavbarContextProvider>{children}</NavbarContextProvider>
}

export default NavbarWrapper
