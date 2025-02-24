import React, { useState } from 'react'

interface DropdownSearchProps {
  label: string
  options: { id: number; name: string }[]
  selected: string
  setSelected: (id: number, value: string) => void
}
const DropdownSearch: React.FC<DropdownSearchProps> = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const filteredOptions = options.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target || !target.parentElement || !target.parentElement.contains(event.currentTarget as Node)) {
      setOpen(false);
      document.removeEventListener('click', handleClickOutside);
    }
  };

  return (
    <div className="relative w-full">
      <button
      onClick={() => {
        setOpen(!open)
      }}
      className="flex w-full rounded-lg border p-2"
      >
      <p className={selected ? 'text-black' : 'text-gray-400'}>{selected || label}</p>
      </button>
      {open && (
      <div className="absolute z-20 w-full rounded-lg border bg-white p-2">
        <input
        className="w-full rounded-lg border p-2"
        autoFocus
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`ค้นหา ${label}`}
        />
        <div className="flex flex-col gap-2 pt-2">
        {filteredOptions.map((item) => (
          <button
          key={item.id}
          className="flex rounded-lg p-2 hover:bg-gray-200"
          onClick={() => {
            setOpen(false)
            setSelected(item.id,item.name)
          }}
          >
          {item.name}
          </button>
        ))}
        </div>
      </div>
      )}
    </div>
  )
}

export default DropdownSearch
