import { pathAPI } from "@/lib/api"

export const updateDeductionsInBackend = async (phone_id: number, updatedDeductions: Record<string, number>) => {
  try {
    const response = await fetch(`${pathAPI}/priceadjustment/${phone_id}/deductions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDeductions),
    })

    if (response.ok) {
      console.log('Deductions updated successfully')
    } else {
      const errorResponse = await response.json()
      const status = response.status
      if (status === 400) {
        console.error('Bad request: Invalid input data', errorResponse)
      } else if (status === 404) {
        console.error('Not found: Phone ID not found', errorResponse)
      } else {
        console.error(`Failed to update deductions (status: ${status}):`, errorResponse)
      }
    }
  } catch (error) {
    console.error('Error updating deductions:', error)
  }
}
