// Libraries
import geolocation from '@react-native-community/geolocation';

const getGeolocation = async () => {
  return new Promise((resolve, reject) =>
    geolocation.getCurrentPosition(
      location =>
        resolve({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        }),
      () => reject(undefined),
      {
        timeout: 15000,
        maximumAge: 15000,
        enableHighAccuracy: true,
      },
    ),
  );
};

export default getGeolocation;
