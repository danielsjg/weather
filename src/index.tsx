// React
import React from 'react';

// Libraries
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

// Redux
import { store, persistor } from '~/store';

// Routes
import Routes from '~/routes';

// Styles
import theme from '~/styles';

const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};

export default Index;
