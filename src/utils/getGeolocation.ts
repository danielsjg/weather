// Libraries
import geolocation from '@react-native-community/geolocation';

const getGeolocation = () => {
  return new Promise<{ lat: number; lon: number } | undefined>(
    (resolve, reject) =>
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
          enableHighAccuracy: false,
        },
      ),
  );
};

export default getGeolocation;
