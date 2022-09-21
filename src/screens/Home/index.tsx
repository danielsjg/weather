// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';

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
  Loading,
  Content,
} from './styles';

// Assets
import locationNotFound from '~/assets/images/locationNotFound.png';

// Styles
import { useTheme } from 'styled-components';

const Home: React.FC<{
  locationPermission?: boolean;
  userLocationLoading?: boolean;
  getGeolocationFailed?: boolean;
}> = testProps => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [locationPermission, setLocationPermission] = useState<boolean>(
    testProps.locationPermission ?? false,
  );

  const [getGeolocationFailed, setGetGeolocationFailed] = useState<boolean>(
    testProps.getGeolocationFailed ?? false,
  );

  const [userLocationLoading, setUserLocationLoading] = useState<boolean>(
    testProps.userLocationLoading ?? false,
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
    setUserLocationLoading(true);
    const location = await getGeolocation();
    if (location) {
      setGetGeolocationFailed(false);
      dispatch(getWeatherRequest(location));
    } else {
      setGetGeolocationFailed(true);
    }
    setUserLocationLoading(false);
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
        <Container testID="permissionContainer">
          <Image source={locationNotFound} />
          <Text>The app is not allowed to get your location!</Text>
        </Container>
      );
    }
    if (userLocationLoading) {
      return (
        <Container testID="loadingLocationContainer">
          <Loading />
          <Subtitle>Trying to get device location...</Subtitle>
        </Container>
      );
    }
    if (weatherLoading) {
      return (
        <Container testID="loadingWeatherContainer">
          <Loading />
          <Subtitle>Trying to get weather data...</Subtitle>
        </Container>
      );
    }
    if (
      [city, temp, feelsLike, pressure, humidity].includes(undefined) ||
      getGeolocationFailed
    ) {
      return (
        <Container testID="failedContainer">
          <Icon
            name="refresh"
            size={theme.metrics.iconSizeMedium}
            color={theme.colors.primaryText}
            onPress={getWeather}
            suppressHighlighting
          />
          <Subtitle testID="failedText">
            {getGeolocationFailed
              ? 'Getting device location '
              : 'Getting weather data '}
            has failed!
          </Subtitle>
          <Text>Make sure location service is enabled.</Text>
        </Container>
      );
    }
    return (
      <>
        <SafeContainer>
          <Content>
            <TitleContainer>
              <TitleLeftContent>
                <Title testID="city">{city}</Title>
                <Subtitle color={theme.colors.secondaryText}>
                  {moment().format('MMMM, DD')}
                </Subtitle>
              </TitleLeftContent>
              <TitleRightContent>
                <Title testID="temp">{temp?.toFixed(1)}°C</Title>
                <Icon
                  name="refresh"
                  size={theme.metrics.fontSizeHigh}
                  color={theme.colors.primaryText}
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
              <Text color={theme.colors.secondaryText}>
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
                  textColor={theme.colors.primaryText}
                  backgroundColor={theme.colors.primary}
                />
              ))}
            </CardsContainer>
          </Content>
        </SafeContainer>
        <Footer>
          <SafeContainer>
            <Subtitle color={theme.colors.tertiaryText}>WIND</Subtitle>
            <CardsContainer>
              {Object.values(windCardData).map(card => (
                <Card
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  unit={card.unit}
                  textColor={theme.colors.tertiaryText}
                  backgroundColor={theme.colors.tertiary}
                />
              ))}
            </CardsContainer>
          </SafeContainer>
        </Footer>
      </>
    );
  }, [
    theme,
    locationPermission,
    userLocationLoading,
    getGeolocationFailed,
    mainCardData,
    windCardData,
    getWeather,
    weatherLoading,
    city,
    temp,
    feelsLike,
    humidity,
    pressure,
    weather,
  ]);

  return <ScrollContainer>{renderScreenContent()}</ScrollContainer>;
};

export default Home;
