import { pathAPI } from '@/lib/api';



export const fetchData = async (selectedBrandId: number, selectedModelId: number, selectedPhoneId: number, capacity: any[], setData: (data: any) => void) => {
  if (!selectedBrandId) {
    alert('Please select brand');
    return;
  }
  try {
    const url = `${pathAPI}/api/${selectedBrandId}/${selectedModelId}/${selectedPhoneId}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const result = await res.json();
    const transformedData = {
      id: result.phone.id,
      brand_name: result.brand.brand_name,
      model_name: result.model.model_name,
      capacity_value: capacity.find((c) => c.id === result.phone.capacity_id)?.capacity_value || 'N/A',
      price: result.phone.price,
    };
    setData([transformedData]);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
};