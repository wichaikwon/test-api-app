'use client'

import React from 'react';
import { useForm } from 'react-hook-form'

interface FormValues {
  username: string
  password: string
}

const Page: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('username')} />
          <input type="password" {...register('username')} />
          <button type="submit">Login</button>
        </form>
    );
};

export default Page;