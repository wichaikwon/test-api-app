'use client'

import { usePathname } from 'next/navigation'

const EditPage: React.FC = () => {
  const pathname = usePathname()
  const parts = pathname.split(`/`).filter(Boolean)
  const editIndex = parts.indexOf('edit')
  if (editIndex === -1 || parts.length < editIndex + 4) {
    return <p className="text-red-500">Invalid URL</p>
  }
  const [brand_id, model_id, capacity_id, phone_id] = parts.slice(editIndex + 1, editIndex + 5)

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Edit Phone</h1>
      <p>Brand ID: {brand_id}</p>
      <p>Model ID: {model_id}</p>
      <p>Capacity ID: {capacity_id}</p>
      <p>Phone ID: {phone_id}</p>

      <div className="flex flex-col gap-4">
        {[
          'brand',
          'model',
          'storage',
          'price',
          'modelPhone',
          'warranty',
          'Machine',
          'Screen',
          'Touch Screen',
          'Battery',
          'Extension',
          'Usage',
        ].map((item, idx) => (
          <div key={idx} className="flex items-center">
            <p className="w-4/12 md:w-52">{item}</p>
            {item === 'brand' || item === 'model' || item === 'storage' || item === 'price' ? (
              <input className=" w-full rounded-md border p-2" placeholder={`select ${item}`} />
            ) : (
              <div className="flex w-full gap-2 justify-between">
                <input className=" w-full rounded-md border p-2" placeholder={` ${item}`} />
                <input className="w-full rounded-md border p-2" placeholder={` ${item}`} />
                <input className="w-full rounded-md border p-2" placeholder={` ${item}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditPage
