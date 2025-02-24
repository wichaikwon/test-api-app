'use client'
import DropdownSearch from '@/app/components/DropdownSearch'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchBrands, fetchCapacities, fetchModels,fetchPhones } from '@/lib/data/brands'
import { pathAPI } from '@/lib/data/api'
import { useDebounce } from '@uidotdev/usehooks'

interface Brand {
  id: number
  brand_name: string
}
interface Model {
  id: number
  brand_id: number
  model_name: string
}
interface Phone {
  id: number
  brand_id: number
  model_id: number
  capacity_id: number
  price: number
}
interface Capacity {
  id: number
  capacity_value: string
}

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [brand, setBrand] = useState<Brand[]>([])
  const [model, setModel] = useState<Model[]>([])
  const [phone, setPhone] = useState<Phone[]>([])
  const [capacity, setCapacity] = useState<Capacity[]>([])
  const [data, setData] = useState<any>([])

  const [selectedBrandName, setSelectedBrandName] = useState(searchParams.get('brand_name') || '')
  const [selectedModelName, setSelectedModelName] = useState(searchParams.get('model_name') || '')
  const [selectedCapacity, setSelectedCapacity] = useState(searchParams.get('capacity_value') || '')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedBrandName = useDebounce(selectedBrandName, 300)
  useEffect(() => {
    fetchBrands().then(setBrand)
    fetchModels().then(setModel)
    fetchPhones().then(setPhone)
    fetchCapacities().then(setCapacity)
  }, [])

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams(searchParams)
    if (selectedBrandName) params.set('brand_name', debouncedBrandName)
    if (selectedModelName) params.set('model_name', selectedModelName)
    if (selectedCapacity) params.set('capacity_value', selectedCapacity)
    router.replace(`${pathname}?${params.toString()}`)

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${pathAPI}/api?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch data')

      const result = await res.json()
      setData(result.phones)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [selectedBrandName, selectedModelName, selectedCapacity, pathname, debouncedBrandName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filterBrand = useMemo(() => brand.map((b) => ({ id: b.id, name: b.brand_name })), [brand])
  const filterModel = useMemo(
    () =>
      model
        .filter((m) => brand.find((b) => b.brand_name === selectedBrandName)?.id === m.brand_id)
        .map((m) => ({ id: m.id, name: m.model_name })),
    [model, selectedBrandName]
  )

  const filterPhone = useMemo(
    () =>
      phone
        .filter((p) => model.find((m) => m.model_name === selectedModelName)?.id === p.model_id)
        .map((p) => ({
          id: p.id,
          name: capacity.find((c) => c.id === p.capacity_id)?.capacity_value || '',
          price: p.price,
        })),

    [phone, selectedModelName, capacity]
  )
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="flex w-full items-center justify-center gap-4">
        <DropdownSearch
          label="Brands"
          options={filterBrand}
          selected={selectedBrandName}
          setSelected={(id, name) => {
            setSelectedBrandName(name)
            setSelectedModelName('')
            setSelectedCapacity('')
          }}
        />
        <DropdownSearch
          label="Models"
          options={filterModel}
          selected={selectedModelName}
          setSelected={(id, name) => {
            setSelectedModelName(name)
            setSelectedCapacity('')
          }}
        />
        <DropdownSearch
          label="Storages"
          options={filterPhone}
          selected={selectedCapacity}
          setSelected={(id, name) => setSelectedCapacity(name)}
        />
        <button
          onClick={() => {
            window.location.href = pathname
          }}>
          clear
        </button>
      </div>
      {selectedBrandName && (
        <div>
          {Array.isArray(data) && data.length > 0 ? (
            <div>
              {data.map((d, idx) => (
                <div key={idx} className="flex w-full items-center justify-center gap-4">
                  <p>{d.brand_name}</p>
                  <p>{d.model_name}</p>
                  <p>{d.capacity_value}</p>
                  <p>{d.price}</p>
                  <div>
                    <button
                      onClick={() => router.push(`${pathname}/edit/${d.brand_id}/${d.model_id}/${d.capacity_id}/${d.phone_id}/`)}
                      className="rounded bg-blue-500 px-4 py-2 text-white">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard
