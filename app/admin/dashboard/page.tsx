'use client'
import DropdownSearch from '@/app/components/DropdownSearch'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchBrands, fetchModels } from '@/lib/data'
import { pathAPI } from '@/lib/api'
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

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [brand, setBrand] = useState<Brand[]>([])
  const [model, setModel] = useState<Model[]>([])
  const [data, setData] = useState<any[]>([])

  const [selectedBrandName, setSelectedBrandName] = useState(searchParams.get('brand_name') || '')
  const [selectedModelName, setSelectedModelName] = useState(searchParams.get('model_name') || '')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedBrandName = useDebounce(selectedBrandName, 300)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams(searchParams)
    if (selectedBrandName) params.set('brand_name', debouncedBrandName)
    if (selectedModelName) params.set('model_name', selectedModelName)
    router.replace(`${pathname}?${params.toString()}`)

    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${pathAPI}/api?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch data')

      const result = await res.json()
      setData(Array.isArray(result.phones) ? result.phones : [])
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [selectedBrandName, selectedModelName, pathname, debouncedBrandName])

  useEffect(() => {
    fetchBrands().then(setBrand)
    fetchModels().then(setModel)
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (selectedBrandName) params.delete('model_name')
    router.replace(`${pathname}?${params.toString()}`)
  }, [selectedBrandName])

  const filterBrand = useMemo(() => brand.map((b) => ({ id: b.id, name: b.brand_name })), [brand])
  const filterModel = useMemo(
    () =>
      model
        .filter((m) => brand.find((b) => b.brand_name === selectedBrandName)?.id === m.brand_id)
        .map((m) => ({ id: m.id, name: m.model_name })),
    [model, selectedBrandName]
  )

  const filteredData = useMemo(() => {
    return (Array.isArray(data) ? data : []).filter(
      (d: any) =>
        d.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.model_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.capacity_value.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.price.toString().includes(searchQuery)
    )
  }, [data, searchQuery])

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 p-4">
      <div className="flex w-full items-center justify-center gap-4">
        <DropdownSearch
          label="Brands"
          options={filterBrand}
          selected={selectedBrandName}
          setSelected={(name) => {
            setSelectedBrandName(name)
            setSelectedModelName('')
          }}
        />
        <DropdownSearch
          label="Models"
          options={filterModel}
          selected={selectedModelName}
          setSelected={(name) => {
            setSelectedModelName(name)
          }}
        />
        <button
          onClick={() => {
            window.location.href = pathname
          }}>
          clear
        </button>
      </div>
      {selectedBrandName ? (
        <>
          <div className="flex w-full items-center px-20">
            <input
              className="w-full rounded-md border p-2"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full rounded border border-gray-200">
            {Array.isArray(data) && data.length > 0 ? (
              <>
                <div className="grid grid-cols-5 items-center gap-4 border-b bg-gray-200 p-2">
                  {['Brands', 'Models', 'Storage', 'Price', 'Action'].map((header, idx) => (
                    <div key={idx} className="flex w-full justify-between border-r border-white p-2">
                      <p className="flex w-full items-center justify-center">{header}</p>
                      <button>sort</button>
                    </div>
                  ))}
                </div>
                {paginatedData.length > 0 ? (
                  paginatedData.map((d: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-5 items-center gap-4 border-b p-2">
                      {['brand_name', 'model_name', 'capacity_value', 'price'].map((key, i) => (
                        <p key={i} className="flex justify-center border-r">
                          {d[key]}
                        </p>
                      ))}
                      <div className="flex justify-around">
                        <button
                          onClick={() => {
                            router.push(`${pathname}/edit/${d.phone_id}/${d.brand_id}/${d.model_id}/${d.capacity_id}/`)
                          }}
                          className="rounded-lg bg-yellow-400 p-2 text-white">
                          Edit
                        </button>
                        <button className="rounded-lg bg-red-400 p-2 text-white">Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{loading}</p>
                )}
                <div className="flex justify-center gap-4 p-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-md">
                    Previous
                  </button>
                  <p className="flex items-center justify-center">
                    Page {currentPage} of {totalPages}
                  </p>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md">
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full items-center px-20">
            <input
              className="w-full rounded-md border p-2"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled
            />
          </div>
          <div className="w-full rounded border border-gray-200">
            <div className="grid grid-cols-6 items-center gap-4 border-b bg-gray-200 p-2">
              {['Brands', 'Models', 'Storage', 'Price', 'Action'].map((header, idx) => (
                <div key={idx} className="flex w-full justify-between border-r border-white p-2">
                  <p className="flex w-full items-center justify-center">{header}</p>
                  <button>sort</button>
                </div>
              ))}
            </div>
            <p className='flex justify-center text-xl'>
              no data please select Brand
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
