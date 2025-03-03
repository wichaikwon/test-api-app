'use client'
import { fetchBrands, fetchCapacities, fetchModels, fetchPhones } from '@/lib/data';
import React, { useEffect, useMemo, useState } from 'react';
import DropdownSearch from './DropdownSearch';

const EstimateSection: React.FC = () => {
    
  const [brands, setBrands] = useState<{ id: number; brand_name: string }[]>([])
  const [models, setModels] = useState<{ id: number; brand_id: number; model_name: string }[]>([])
  const [phones, setPhones] = useState<
    { id: number; brand_id: number; model_id: number; capacity_id: number; price: number; min_price: number }[]
  >([])
  const [capacity, setCapacity] = useState<{ id: number; capacity_value: string }[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedCapacity, setSelectedCapacity] = useState('')

  useEffect(() => {
    fetchBrands().then((data) => setBrands(data))
    fetchModels().then((data) => setModels(data))
    fetchPhones().then((data) => setPhones(data))
    fetchCapacities().then((data) => setCapacity(data))
  }, [])
  const filteredModel = useMemo(
    () =>
      models
        .filter((m) => brands.find((b) => b.brand_name === selectedBrand)?.id === m.brand_id)
        .map((m) => ({ id: m.id, name: m.model_name })),
    [models, selectedBrand]
  )
  const filterCapacity = useMemo(
    () =>
      phones
        .filter((p) => models.find((m) => m.model_name === selectedModel)?.id === p.model_id)
        .map((p) => ({ id: p.id, name: capacity.find((c) => c.id === p.capacity_id)?.capacity_value })),
    [phones, selectedModel]
  )
    return (
        <div
        className={`flex flex-col items-center justify-center gap-4 bg-[url('https://placehold.co/500x400')] md:flex-row md:bg-[url('https://placehold.co/1960x400')]`}>
        <div className="flex w-full justify-center">
          <img src="http://placehold.co/400x200" />
        </div>
        <div className="flex w-full items-center justify-center p-4 md:justify-start">
          <div className="flex h-[394px] w-[390px] flex-col gap-4 rounded-md bg-white p-8">
            <p className="flex justify-center text-xl font-bold">ประเมินราคาโทรศัพท์ที่ต้องการขาย</p>
            <div className="flex w-full flex-col gap-4">
              <DropdownSearch
                label="Brand"
                options={brands.map((b) => ({ id: b.id, name: b.brand_name }))}
                selected={selectedBrand}
                setSelected={(name) => {
                  setSelectedBrand(name)
                  setSelectedModel('')
                  setSelectedCapacity('')
                }}
              />
              <DropdownSearch
                label="Model"
                options={filteredModel}
                selected={selectedModel}
                setSelected={(name) => {
                  setSelectedModel(name)
                  setSelectedCapacity('')
                }}
              />
              <DropdownSearch
                label="Storage"
                options={filterCapacity.map((c) => ({ id: c.id, name: c.name || '' }))}
                selected={selectedCapacity}
                setSelected={(name) => setSelectedCapacity(name)}
              />
              <button
                className="rounded-md bg-green-500 p-2 text-white hover:bg-green-600 disabled:bg-green-300"
                disabled={selectedBrand === '' || selectedModel === '' || selectedCapacity === ''}>
                ประเมินราคา
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default EstimateSection;