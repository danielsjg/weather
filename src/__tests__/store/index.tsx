// React
import React, { PropsWithChildren } from 'react';

// Libraries
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';

// Redux
import weatherSlice from '~/store/modules/weather/slice';

// Interfaces
import WeatherReduxDTO from '~/store/modules/weather/types';

const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState }: { preloadedState?: { weather: WeatherReduxDTO } } = {},
) => {
  const store = configureStore({
    reducer: { weather: weatherSlice },
    preloadedState,
  });

  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
};

export { renderWithProviders };
