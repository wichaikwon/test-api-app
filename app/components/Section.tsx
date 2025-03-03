import React from "react"
import classNames from "classnames"

interface SectionProps {
  title: string
  state: boolean
  setState: (state: boolean) => void
  selected: string | string[]
  setSelected: React.Dispatch<React.SetStateAction<string | string[]>>
  options: string[]
  isMultiSelect?: boolean
  onClick?: () => void
}

const Section: React.FC<SectionProps> = ({
  title,
  state,
  setState,
  selected,
  setSelected,
  options,
  isMultiSelect,

}) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-slate-200 p-2">
      <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => setState(!state)}>
        <p>{title}</p>
        <p className="text-xs text-yellow-500">
          {isMultiSelect
            ? Array.isArray(selected) && selected.length > 0 && selected.includes("ไม่มีปัญหา")
              ? "ไม่มีปัญหา"
              : Array.isArray(selected) && selected.length > 0 && !selected.includes("ไม่มีปัญหา")
                ? `มี ${selected.length} ข้อ`
                : ""
            : selected}
        </p>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${state ? "max-h-96 pt-2 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className={`grid gap-2 ${title === "Defect (select more 1 choice)" ? "grid-cols-3" : "grid-cols-1"} md:grid-cols-3 md:gap-4`}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (isMultiSelect) {
                  setSelected((prev: string | string[]) => {
                    if (index === 10) {
                      return ["ไม่มีปัญหา"]
                    }
                    if (Array.isArray(prev)) {
                      if (prev.includes("ไม่มีปัญหา")) {
                        return [option]
                      }
                      return prev.includes(option) ? prev.filter((defect) => defect !== option) : [...prev, option]
                    }
                    return [option]
                  })
                } else {
                  setSelected(option) 
                  setState(false)
                }

               
              }}
              className={classNames(
                "flex w-full items-center rounded-lg border bg-white p-2 text-left text-xs text-black hover:border-yellow-500 hover:bg-yellow-50",
                {
                  "bg-yellow-50 border-yellow-500":
                    (isMultiSelect && Array.isArray(selected) && selected.includes(option)) ||
                    (!isMultiSelect && selected === option),
                  "bg-white":
                    (isMultiSelect && Array.isArray(selected) && !selected.includes(option)) ||
                    (!isMultiSelect && selected !== option),
                }
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
