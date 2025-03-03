import classNames from 'classnames'
import React, { useState, useEffect, useRef } from 'react'

interface DropdownSearchProps {
  label: string
  options: { id: number; name: string }[]
  selected: string
  setSelected: (value: string) => void
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button onClick={() => setOpen(!open)} className="flex w-full rounded-lg border p-3">
        <p className={selected ? 'text-black' : 'text-gray-400'}>{selected || label}</p>
      </button>

      {open && (
        <div className="absolute z-20 w-full rounded-lg border bg-white p-2">
          <input
            className="w-full rounded-lg border p-2"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`ค้นหา ${label}`}
          />
          <div
            className={classNames(
              'flex flex-col gap-2 pt-2',
              filteredOptions.length > 4 ? 'h-80 overflow-y-auto' : 'text-center'
            )}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <button
                  key={item.id}
                  className="flex rounded-lg border-b p-2 hover:bg-gray-200"
                  onClick={() => {
                    setOpen(false)
                    setSelected(item.name)
                    setSearch('')
                  }}>
                  {item.name}
                </button>
              ))
            ) : (
              <p className="p-2 text-gray-500">ไม่พบข้อมูล</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownSearch
