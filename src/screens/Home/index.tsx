// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

// Libraries
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

// Components
import Card from '~/components/Card';
import {
  ScrollContainer,
  SafeContainer,
  Container,
  TitleContainer,
  TitleLeftContent,
  TitleRightContent,
  CardsContainer,
  Footer,
  Title,
  Subtitle,
  Text,
  ImageContainer,
  Image,
  LoadingContainer,
  Loading,
  PermissionContainer,
  FailedContainer,
} from './styles';

// Redux
import { useDispatch, useSelector } from '~/store/hooks';
import { getWeatherRequest } from '~/store/modules/weather/slice';

// Assets
import locationNotFound from '~/assets/images/locationNotFound.png';

// Styles
import { metrics, colors } from '~/styles';

const Home: React.FC<{ permission?: boolean }> = testProps => {
  const dispatch = useDispatch();

  const [locationPermission, setLocationPermission] = useState<boolean>(
    testProps.permission ?? false,
  );

  const {
    city,
    feelsLike,
    humidity,
    pressure,
    temp,
    weather,
    wind,
    weatherLoading,
  } = useSelector(store => store.weather);

  const mainCardData = useMemo(
    () => ({
      feelsLike: {
        title: 'Feels Like',
        value: feelsLike?.toFixed(1) ?? 0,
        unit: '°C',
      },
      pressure: { title: 'Pressure', value: pressure ?? 0, unit: 'hPa' },
      humidity: { title: 'Humidity', value: humidity ?? 0, unit: '%' },
    }),
    [feelsLike, pressure, humidity],
  );

  const windCardData = useMemo(
    () => ({
      speed: {
        title: 'Speed',
        value: wind?.speed?.toFixed(1) ?? 0,
        unit: 'm/s',
      },
      direction: {
        title: 'Direction',
        value: wind?.deg ?? 0,
        unit: 'deg',
      },
      gust: { title: 'Gust', value: wind?.gust?.toFixed(1) ?? 0, unit: 'm/s' },
    }),
    [wind],
  );

  const getPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      location => {
        const { latitude, longitude } = location.coords;
        dispatch(getWeatherRequest({ lat: latitude, lon: longitude }));
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  }, [dispatch]);

  const requestLocationPermissionAndroid = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermission(true);
        getPosition();
      }
    } catch (err) {
      console.log(err);
    }
  }, [getPosition]);

  const requestLocationPermissionIOS = useCallback(async () => {
    await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        if (result === 'granted') {
          setLocationPermission(true);
          getPosition();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [getPosition]);

  const refreshWeather = useCallback(() => {
    getPosition();
  }, [getPosition]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermissionAndroid();
    } else {
      requestLocationPermissionIOS();
    }
  }, [requestLocationPermissionAndroid, requestLocationPermissionIOS]);

  const renderScreenContent = useCallback(() => {
    if (!locationPermission) {
      return (
        <PermissionContainer testID="permissionContainer">
          <Image source={locationNotFound} />
          <Text>The app is not allowed to get your location</Text>
        </PermissionContainer>
      );
    }
    if (weatherLoading) {
      return (
        <LoadingContainer testID="loadingContainer">
          <Loading />
          <Subtitle>Loading weather data...</Subtitle>
        </LoadingContainer>
      );
    }
    if ([city, temp, feelsLike, pressure, humidity].includes(undefined)) {
      return (
        <FailedContainer testID="failedContainer">
          <Icon
            name="refresh"
            size={metrics.fontSizeHigh}
            color={colors.primaryText}
            onPress={refreshWeather}
            suppressHighlighting
          />
          <Subtitle>Reading weather data has failed</Subtitle>
        </FailedContainer>
      );
    }
    return (
      <>
        <SafeContainer>
          <Container>
            <TitleContainer>
              <TitleLeftContent>
                <Title testID="city">{city}</Title>
                <Subtitle color={colors.secondaryText}>
                  {moment().format('MMMM, DD')}
                </Subtitle>
              </TitleLeftContent>
              <TitleRightContent>
                <Title testID="temp">{temp?.toFixed(1)}°C</Title>
                <Icon
                  name="refresh"
                  size={metrics.fontSizeHigh}
                  color={colors.primaryText}
                  onPress={refreshWeather}
                  suppressHighlighting
                />
              </TitleRightContent>
            </TitleContainer>
            <ImageContainer>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather?.icon}@4x.png`,
                }}
              />
              <Text color={colors.secondaryText}>
                {weather?.description?.toUpperCase()}
              </Text>
            </ImageContainer>
            <CardsContainer>
              {Object.values(mainCardData).map(card => (
                <Card
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  textColor={colors.primaryText}
                  backgroundColor={colors.primary}
                />
              ))}
            </CardsContainer>
          </Container>
        </SafeContainer>
        <Footer>
          <SafeContainer>
            <Subtitle color={colors.tertiaryText}>WIND</Subtitle>
            <CardsContainer>
              {Object.values(windCardData).map(card => (
                <Card
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  textColor={colors.tertiaryText}
                  backgroundColor={colors.tertiary}
                />
              ))}
            </CardsContainer>
          </SafeContainer>
        </Footer>
      </>
    );
  }, [
    locationPermission,
    weatherLoading,
    mainCardData,
    windCardData,
    city,
    temp,
    feelsLike,
    humidity,
    pressure,
    weather,
    refreshWeather,
  ]);

  return <ScrollContainer>{renderScreenContent()}</ScrollContainer>;
};

export default Home;
