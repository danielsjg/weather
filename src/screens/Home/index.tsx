// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

// Libraries
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux
import { useDispatch, useSelector } from '~/store/hooks';
import { getWeatherRequest } from '~/store/modules/weather/slice';

// Utils
import getPermission from '~/utils/getPermission';
import getGeolocation from '~/utils/getGeolocation';

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

// Assets
import locationNotFound from '~/assets/images/locationNotFound.png';

// Styles
import { metrics, colors } from '~/styles';

const Home: React.FC<{
  locationPermission?: boolean;
  loadingUserLocation?: boolean;
}> = testProps => {
  const dispatch = useDispatch();

  const [locationPermission, setLocationPermission] = useState<boolean>(
    testProps.locationPermission ?? false,
  );

  const [loadingUserLocation, setLoadingUserLocation] = useState<boolean>(
    testProps.loadingUserLocation ?? false,
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

  const getWeather = useCallback(async () => {
    setLoadingUserLocation(true);
    const location = await getGeolocation();
    if (location) {
      dispatch(getWeatherRequest(location));
    } else {
      Alert.alert('Something went wrong!', 'Try again later.');
    }
    setLoadingUserLocation(false);
  }, [dispatch]);

  useEffect(() => {
    getPermission().then(permission => {
      setLocationPermission(permission);
      if (permission) {
        getWeather();
      }
    });
  }, [getWeather]);

  const renderScreenContent = useCallback(() => {
    if (!locationPermission) {
      return (
        <PermissionContainer testID="permissionContainer">
          <Image source={locationNotFound} />
          <Text>The app is not allowed to get your location</Text>
        </PermissionContainer>
      );
    }
    if (loadingUserLocation) {
      return (
        <LoadingContainer testID="loadingLocationContainer">
          <Loading />
          <Subtitle>Trying to get location...</Subtitle>
        </LoadingContainer>
      );
    }
    if (weatherLoading) {
      return (
        <LoadingContainer testID="loadingWeatherContainer">
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
            onPress={getWeather}
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
                  onPress={getWeather}
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
    loadingUserLocation,
    mainCardData,
    windCardData,
    city,
    temp,
    feelsLike,
    humidity,
    pressure,
    weather,
    getWeather,
  ]);

  return <ScrollContainer>{renderScreenContent()}</ScrollContainer>;
};

export default Home;
