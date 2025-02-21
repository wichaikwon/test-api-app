'use client'
import { useRouter } from 'next/navigation'
import { createContext, FC, ReactNode } from 'react'

interface NavbarContextProps {}

export const NavbarContext = createContext<NavbarContextProps>({})

interface NavbarProviderProps {
  children: ReactNode
}

export const NavbarContextProvider: FC<NavbarProviderProps> = ({ children }) => {
  const router = useRouter()
  return (
    <NavbarContext.Provider value={{}}>
      <div className='flex justify-center gap-4'>
        <button onClick={() => router.push("/")}>HOME</button>
        <button onClick={() => router.push("/detail")}>Detail</button>
      </div>
        {children}
    </NavbarContext.Provider>
  )
}
