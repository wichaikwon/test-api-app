'use client'
import DropdownSearch from '@/app/components/DropdownSearch'
import { pathAPI } from '@/lib/data/api'
import { useDebounce } from '@uidotdev/usehooks'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

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
interface capacity {
  id: number
  capacity_value: string
}
const Dashboard: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const [value, setValue] = useState(initialSearch)
  const [brand, setBrand] = useState<Brand[]>([])
  const [model, setModel] = useState<Model[]>([])
  const [phone, setPhone] = useState<Phone[]>([])
  const [capacity, setCapacity] = useState<capacity[]>([])
  const [data, setData] = useState<
    { id: number; brand_name: string; model_name: string; capacity_value: string; price: number }[]
  >([])
  const [brands, setBrands] = useState<{ id: number; brand_name: string }[]>([])
  const [selectedBrandId, setSelectedBrandId] = useState<number>()
  const [selectedModelId, setSelectedModelId] = useState<number>()
  const [selectedPhoneId, setSelectedPhoneId] = useState<number>()
  const [selectedBrandName, setSelectedBrandName] = useState<string>('')
  const [selectedModelName, setSelectedModelName] = useState<string>('')
  const [selectedPhoneName, setSelectedPhoneName] = useState<string>('')
  const debouncedValue = useDebounce(value, 1000)
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
        .map((p) => ({ id: p.id, cid: capacity.find((c) => c.id === p.capacity_id)?.capacity_value, price: p.price })),
    [phone, selectedModelName, capacity]
  )
  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch(`${pathAPI}/brands`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setBrand(data)
      } else {
        console.error('Fetched data is not an array:', data)
      }
    }
    const fetchModels = async () => {
      const res = await fetch(`${pathAPI}/models`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setModel(data)
      } else {
        console.error('Fetched data is not an array:', data)
      }
    }
    const fetchPhones = async () => {
      const res = await fetch(`${pathAPI}/phones`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setPhone(data)
      } else {
        console.error('Fetched data is not an array:', data)
      }
    }
    const fetchCapacity = async () => {
      const res = await fetch(`${pathAPI}/capacities`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setCapacity(data)
      } else {
        console.error('Fetched data is not an array:', data)
      }
    }

    fetchBrands()
    fetchModels()
    fetchPhones()
    fetchCapacity()
  }, [])
  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, [value, pathname, router, searchParams])
  
  const fetchData = useCallback(async () => {
    try {
      const apiUrl = `${pathAPI}/api/${selectedBrandId}/${selectedModelId}/${selectedPhoneId}?q=search`
      const res = await fetch(apiUrl)
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
      }
      const result = await res.json()
      const transformedData = {
        id: result.phone.id,
        brand_name: result.brand.brand_name,
        model_name: result.model.model_name,
        capacity_value: capacity.find((c) => c.id === result.phone.capacity_id)?.capacity_value || 'N/A',
        price: result.phone.price,
      }
      setData([transformedData])
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('An error occurred while fetching data. Please try again.')
    }
  }, [selectedBrandId, selectedModelId, selectedPhoneId, capacity])

  useEffect(() => {
    if (selectedBrandId && selectedModelId && selectedPhoneId) {
      fetchData()
    }
  }, [selectedBrandId, selectedModelId, selectedPhoneId, fetchData])

  const handleSearch = useCallback(async () => {
    const params = new URLSearchParams({brand_name : debouncedValue}).toString()
    const res = await fetch(`${pathAPI}/brands?${params}`)
    const data = await res.json()
    if (Array.isArray(data)) {
      setBrands(data)
    } else {
      console.error('Fetched data is not an array:', data)
    }
  }, [debouncedValue])

  useEffect(() => {
    updateURLParams()
  }, [updateURLParams])

  useEffect(() => {
    if (debouncedValue) {
      handleSearch()
    }
  }, [debouncedValue, handleSearch])

  // const parseSearchQuery = (query: string) => {
    //     if (!value) return
    //   const parts = query.split(',')
    //   return {
    //     brand_name: parts[0] || '',
    //     model_name: parts.slice(1, parts.length - 1).join(' ') || '',
    //     capacity_value: parts[parts.length -1] || ''
    //   }
    // }
    // const fetchBrands = useCallback(async () => {
    //   const parsedQuery = parseSearchQuery(value)
    //   const { brand_name, model_name, capacity_value } = parsedQuery || { brand_name: '', model_name: '', capacity_value: '' }
    //   const queryParams = new URLSearchParams({
    //     brand_name,
    //     model_name,
    //     capacity_value
    //   })
    //   const res = await fetch(`${pathAPI}/api?${queryParams.toString()}`)
    //   const data = await res.json()
    //   setBrands(data.phones || [])
    // }, [value])
    // const updateURLParams = useCallback(() => {
    //   const params = new URLSearchParams(searchParams)
    //   if (value) {
    //     params.set('search', value)
    //   } else {
    //     params.delete('search')
    //   }
    //   router.replace(`${pathname}?${params.toString()}`)
    // }, [value, pathname, router, searchParams])
    // useEffect(() => {
    //   updateURLParams()
    //   fetchBrands()
    // }, [value, updateURLParams, fetchBrands])
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center gap-4">
      <div className="flex w-full items-center justify-center gap-4">
        <DropdownSearch
          label="Brands"
          options={filterBrand}
          selected={selectedBrandName}
          setSelected={(id, name) => {
            setSelectedBrandId(id)
            setSelectedBrandName(name)
            setSelectedModelName('')
          }}
        />
        <DropdownSearch
          label="Models"
          options={filterModel}
          selected={selectedModelName}
          setSelected={(id, name) => {
            setSelectedModelId(id)
            setSelectedModelName(name)
            setSelectedPhoneName('')
          }}
        />
        <DropdownSearch
          label="Storages"
          options={filterPhone.map((p) => ({ id: p.id, name: `${p.cid}` }))}
          selected={selectedPhoneName}
          setSelected={(id, name) => {
            setSelectedPhoneId(id)
            setSelectedPhoneName(name)
          }}
        />
      </div>

      <div className="flex h-full flex-col items-center">
        <p>search</p>
        <input className="rounded-md border p-2" value={value} onChange={(e) => setValue(e.target.value)} />
        {brands.map((item) => (
          <div className="flex" key={item.id}>
            <p>{item.brand_name}</p>
            <Link href={`${pathname}/edit/${item.id}?brand=${value}`}>
              <button className="rounded-md bg-yellow-300 p-1">edit</button>
            </Link>
          </div>
        ))}
      </div>

      <div>
        {data.map((item) => (
          <div key={item.id} className="flex gap-4">
            <p>{item.brand_name}</p>
            <p>{item.model_name}</p>
            <p>{item.capacity_value}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
