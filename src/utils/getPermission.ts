// React
import { Platform, PermissionsAndroid } from 'react-native';

// Libraries
import { request, PERMISSIONS } from 'react-native-permissions';

const requestLocationPermissionAndroid = async () => {
  let permission: boolean = false;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      permission = true;
    }
  } catch (err) {
    console.log(err);
  }

  return permission;
};

const requestLocationPermissionIOS = async () => {
  let permission: boolean = false;

  await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    .then(result => {
      if (result === 'granted') {
        permission = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return permission;
};

const getPermission = async () => {
  let permission: boolean = false;
  if (Platform.OS === 'android') {
    permission = await requestLocationPermissionAndroid();
  } else {
    permission = await requestLocationPermissionIOS();
  }
  return permission;
};

export default getPermission;
