// React
import React from 'react';

// Components
import { Container, Title, Text } from './styles';

const Card: React.FC<{
  title: string;
  value: number | string;
  unit: string;
  textColor: string;
  backgroundColor: string;
}> = ({ title, value, unit, textColor, backgroundColor }) => {
  return (
    <Container color={backgroundColor}>
      <Text color={textColor}>{title}</Text>
      <Title color={textColor} testID={title}>
        {value}
      </Title>
      <Text color={textColor} alignSelf={'flex-end'}>
        {unit}
      </Text>
    </Container>
  );
};

export default Card;
