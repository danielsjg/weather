// Libraries
import geolocation from '@react-native-community/geolocation';

const getGeolocation = async () => {
  let userLocation: { lat: number; lon: number } | undefined;

  geolocation.getCurrentPosition(
    location => {
      userLocation = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
    },
    err => console.log(err),
    {
      timeout: 3000,
      maximumAge: 15000,
    },
  );

  return new Promise<typeof userLocation>(resolve =>
    setTimeout(() => resolve(userLocation), 3000),
  );
};

export default getGeolocation;
