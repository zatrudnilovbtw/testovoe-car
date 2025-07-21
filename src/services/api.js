import axios from 'axios';

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles';

export const fetchVehicles = async () => {
  if (!API_URL) {
    throw new Error('Ошибка API');
  }
  const response = await axios.get(API_URL);
  return response.data;
};