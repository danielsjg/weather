// API
import api from '~/services/api';

// DotEnv
import { API_KEY } from '@env';

// Interfaces
import { GetWeatherResponseDTO } from './types';

function getWeatherAPI({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<GetWeatherResponseDTO> {
  return api.get('/weather', {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: API_KEY,
    },
  });
}

export { getWeatherAPI };
