'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Admin: React.FC = () => {
  const router = useRouter()
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-100">
      <div className="flex w-9/12 flex-col justify-start gap-2 rounded-lg bg-white p-4 shadow-lg md:w-3/12">
        <p className="flex justify-center">Admin Page</p>
        <p>name</p>
        <input type="text" className="rounded-md border p-2" />
        <p>password</p>
        <input type="password" className="rounded-md border p-2" />
        <button onClick={() => router.push("/admin/dashboard") } className="bg-blue-500 text-white p-2 rounded-md">Login</button>
      </div>
    </div>
  )
}

export default Admin
Admin
