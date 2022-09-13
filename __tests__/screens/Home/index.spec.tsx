// React
import React from 'react';

// Screen
import Home from '~/screens/Home';

// Redux
import { renderWithProviders } from '../../store';

describe('Home Screen', () => {
  it('should render correctly component if no have location permission', () => {
    const { getByTestId } = renderWithProviders(<Home />);

    expect(getByTestId('permissionContainer')).toBeTruthy();
  });

  it('should render correctly component while loading user location', () => {
    const { getByTestId } = renderWithProviders(
      <Home locationPermission loadingUserLocation />,
    );

    expect(getByTestId('loadingLocationContainer')).toBeTruthy();
  });

  it('should render correctly component while loading weather data', () => {
    const { getByTestId } = renderWithProviders(<Home locationPermission />, {
      preloadedState: {
        weather: {
          weatherLoading: true,
        },
      },
    });

    expect(getByTestId('loadingWeatherContainer')).toBeTruthy();
  });

  it('should render correctly component if first getting weather data failed', () => {
    const { getByTestId } = renderWithProviders(<Home locationPermission />, {
      preloadedState: {
        weather: {
          weatherLoading: false,
          city: undefined,
          temp: undefined,
          feelsLike: undefined,
          humidity: undefined,
          pressure: undefined,
        },
      },
    });

    expect(getByTestId('failedContainer')).toBeTruthy();
  });

  it('should render correctly component if getting weather data success', () => {
    const { getByTestId } = renderWithProviders(<Home locationPermission />, {
      preloadedState: {
        weather: {
          weatherLoading: false,
          city: 'Goiânia',
          temp: 28.5,
          feelsLike: 30,
          humidity: 25,
          pressure: 1015,
        },
      },
    });

    // Home Screen
    expect(getByTestId('city').children.join('')).toEqual('Goiânia');
    expect(getByTestId('temp').children.join('')).toEqual('28.5°C');

    // Card Component
    expect(getByTestId('Feels Like').children.join('')).toContain('30');
    expect(getByTestId('Humidity').children.join('')).toContain('25');
    expect(getByTestId('Pressure').children.join('')).toContain('1015');
  });
});
