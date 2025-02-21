import type { Metadata } from 'next'
import { Chakra_Petch } from 'next/font/google'
import './globals.css'
import { NavbarContextProvider } from '@/contexts/useNavbar'

const chakraPetch = Chakra_Petch({
  subsets: ['thai'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${chakraPetch.className} antialiased`}>
        <NavbarContextProvider>{children}</NavbarContextProvider>
      </body>
    </html>
  )
}
