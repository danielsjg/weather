// Interfaces
import WeatherDTO from '~/@types/WeatherDTO';
import WindDTO from '~/@types/WindDTO';

interface IInitialWeatherStateDTO {
  weatherLoading?: boolean;
  city?: string;
  temp?: number;
  feelsLike?: number;
  humidity?: number;
  pressure?: number;
  weather?: WeatherDTO;
  wind?: WindDTO;
}

export default IInitialWeatherStateDTO;
