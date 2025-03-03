import { pathAPI } from '@/lib/api'

export const fetchBrands = async () => {
  try {
    const response = await fetch(`${pathAPI}/brands`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch brands:', error)
    return []
  }
}
export const fetchModels = async () => {
  try {
    const response = await fetch(`${pathAPI}/models`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch brands:', error)
    return []
  }
}

export const fetchCapacities = async () => {
  try {
    const response = await fetch(`${pathAPI}/capacities`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch brands:', error)
    return []
  }
}

export const fetchPhones = async () => {
  try {
    const response = await fetch(`${pathAPI}/phones`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Failed to fetch phones:', error)
    return []
  }
}
export const fetchViewPhones = async (phone_id: string) => {
  try {
    const response = await fetch(`${pathAPI}/phoneswithdefects/${phone_id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Failed to fetch phones:', error)
    return []
  }
}
