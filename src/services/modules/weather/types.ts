// Interfaces
import AxiosResponseDTO from '~/@types/AxiosResponseDTO';
import WeatherDTO from '~/@types/WeatherDTO';
import WindDTO from '~/@types/WindDTO';

interface GetWeatherResponseDTO extends AxiosResponseDTO {
  data: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<WeatherDTO>;
    wind: WindDTO;
  };
}

export type { GetWeatherResponseDTO };
