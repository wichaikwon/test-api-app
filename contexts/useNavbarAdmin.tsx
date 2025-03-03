'use client'
import { useRouter } from 'next/navigation'
import { createContext, FC, ReactNode } from 'react'

interface NavbarAdminContextProps {}

export const NavbarAdminContext = createContext<NavbarAdminContextProps>({})

interface NavbarAdminProviderProps {
  children: ReactNode
}

export const NavbarAdminContextProvider: FC<NavbarAdminProviderProps> = ({ children }) => {
  const router = useRouter()
  return (
    <NavbarAdminContext.Provider value={{}}>
      <nav className="w-full bg-red-500">
        navbar
        <button onClick={() => router.push('/admin/')}>Dashboard</button>
        <button onClick={() => router.push('/admin/dashboard')}>User</button>
      </nav>
      {children}
    </NavbarAdminContext.Provider>
  )
}
