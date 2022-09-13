// React
import React from 'react';

// Screen
import Card from '~/components/Card';

// Redux
import { renderWithProviders } from '../../store';

// Styles
import { colors } from '~/styles';

describe('Card Component', () => {
  it('should render correctly component with props', () => {
    const { getByText } = renderWithProviders(
      <Card
        title="Temp"
        value={30}
        unit="°C"
        textColor={colors.primaryText}
        backgroundColor={colors.primary}
      />,
    );

    expect(getByText('Temp')).toBeTruthy();
    expect(getByText('30')).toBeTruthy();
    expect(getByText('°C')).toBeTruthy();
  });
});
