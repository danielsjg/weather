// Types
import WeatherDTO from '~/@types/WeatherDTO';
import WindDTO from '~/@types/WindDTO';

interface IInitialWeatherStateDTO {
  weatherLoading: boolean | undefined;
  city: string | undefined;
  temp: number | undefined;
  feelsLike: number | undefined;
  humidity: number | undefined;
  pressure: number | undefined;
  weather: WeatherDTO;
  wind: WindDTO;
}

export default IInitialWeatherStateDTO;
