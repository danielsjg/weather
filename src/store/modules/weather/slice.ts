// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import IInitialWeatherStateDTO from './types';
import WeatherDTO from '~/@types/WeatherDTO';
import WindDTO from '~/@types/WindDTO';

const initialState = {
  weatherLoading: false,
  city: undefined,
  temp: undefined,
  feelsLike: undefined,
  humidity: undefined,
  pressure: undefined,
  weather: {
    id: undefined,
    main: undefined,
    description: undefined,
    icon: undefined,
  },
  wind: {
    speed: undefined,
    deg: undefined,
    gust: undefined,
  },
} as IInitialWeatherStateDTO;

const weather = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeatherRequest(state, _) {
      state.weatherLoading = true;
    },

    getWeatherSuccess(
      state,
      action: {
        payload: {
          city: string;
          temp: number;
          feelsLike: number;
          humidity: number;
          pressure: number;
          weather: WeatherDTO;
          wind: WindDTO;
        };
      },
    ) {
      state.city = action.payload.city;
      state.temp = action.payload.temp;
      state.feelsLike = action.payload.feelsLike;
      state.humidity = action.payload.humidity;
      state.pressure = action.payload.pressure;
      state.weather = action.payload.weather;
      state.wind = action.payload.wind;
      state.weatherLoading = false;
    },

    getWeatherFailure(state, _) {
      state.weatherLoading = false;
    },

    clearWeather(state, _) {
      state.weatherLoading = false;
      state.city = undefined;
      state.temp = undefined;
      state.feelsLike = undefined;
      state.humidity = undefined;
      state.pressure = undefined;
      state.weather = {
        id: undefined,
        main: undefined,
        description: undefined,
        icon: undefined,
      };
      state.wind = {
        speed: undefined,
        deg: undefined,
        gust: undefined,
      };
    },
  },
});

export const {
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
  clearWeather,
} = weather.actions;
export default weather.reducer;
