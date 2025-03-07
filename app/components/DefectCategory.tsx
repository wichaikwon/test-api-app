import React, { Fragment } from 'react'
import classNames from 'classnames'

interface DefectCategoryProps {
  item: any
  index: number
  isOpen: boolean
  handleToggleModal: (id: number) => void
  handleToggleSelected: (modal_id: number, id: number, name: string) => void
  multiToggleSelected: (id: number, name: string) => void
  defectChoice: any[]
  defectsCategory: any[]
  selected: any[]
  multiSelected: any[]
}

const DefectCategory: React.FC<DefectCategoryProps> = ({
  item,
  index,
  isOpen,
  handleToggleModal,
  handleToggleSelected,
  multiToggleSelected,
  defectChoice,
  defectsCategory,
  selected,
  multiSelected,
}) => {
  return (
    <Fragment key={index}>
      <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => handleToggleModal(index)}>
        <p>{item.defect_category} </p>
        <p className="text-xs text-yellow-500">
          {index === defectsCategory.length - 1
            ? multiSelected.some((item) => item.id === 35)
              ? 'ไม่มีปัญหา'
              : multiSelected.length === 0
                ? ''
                : ` มี ${multiSelected.map((item) => item.name).length} ข้อ`
            : selected
                .filter((item) => item.modal_id === defectsCategory[index].defect_id)
                .map((item) => item.name)
                .join(', ')}
        </p>
      </div>
      {isOpen && (
        <div className="grid max-h-96 w-full grid-cols-1 gap-2 pt-2 opacity-100 md:grid-cols-3">
          {defectChoice
            .filter((defect) => defect.defect_id === item.defect_id)
            .map((defect, idx) => (
              <div key={idx} className="flex w-full gap-4">
                {index === defectsCategory.length - 1 ? (
                  <button
                    className={classNames(
                      'flex w-full rounded-md border bg-white p-1 hover:border-yellow-500 hover:bg-yellow-50 md:justify-center',
                      multiSelected.some((item) => item.id === Number(defect.choice_id))
                        ? 'border-yellow-500 bg-yellow-50'
                        : ''
                    )}
                    onClick={() => {
                      multiToggleSelected(Number(defect.choice_id), defect.defect_choice)
                    }}>
                    {defect.defect_choice}
                  </button>
                ) : (
                  <button
                    className={classNames(
                      'flex w-full rounded-md border bg-white p-1 hover:border-yellow-500 hover:bg-yellow-50 md:justify-center',
                      selected.some(
                        (item) => item.modal_id === Number(defect.defect_id) && item.id === Number(defect.choice_id)
                      )
                        ? 'border-yellow-500 bg-yellow-50'
                        : ''
                    )}
                    onClick={() => {
                      handleToggleSelected(Number(defect.defect_id), Number(defect.choice_id), defect.defect_choice)
                      handleToggleModal(index)
                      handleToggleModal(index + 1)
                    }}>
                    {defect.defect_choice}
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </Fragment>
  )
}

export default DefectCategory
