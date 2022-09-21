// Libraries
import { Alert } from 'react-native';
import { takeLatest, put, all } from 'redux-saga/effects';

// Services
import {
  getWeatherAPI,
  GetWeatherResponseDTO,
} from '~/services/modules/weather';

// Redux
import {
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
} from './slice';

export function* getWeather({
  payload,
}: {
  payload: { lat: number; lon: number };
}) {
  const { lat, lon }: { lat: number; lon: number } = payload;

  try {
    const response: GetWeatherResponseDTO = yield getWeatherAPI({ lat, lon });

    const {
      name: city,
      main: { temp, feels_like, humidity, pressure },
      weather: [firstWeather],
      wind,
    } = response.data;

    yield put(
      getWeatherSuccess({
        city,
        temp,
        feelsLike: feels_like,
        humidity,
        pressure,
        weather: firstWeather,
        wind,
      }),
    );
  } catch (err) {
    console.log(err);
    Alert.alert('Something went wrong!', 'Try again later.');
    yield put(getWeatherFailure({}));
  }
}

export default all([takeLatest(getWeatherRequest, getWeather)]);
