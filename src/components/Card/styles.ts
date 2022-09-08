import styled from 'styled-components/native';
import { colors, metrics } from '~/styles';

interface IColor {
  color?: string;
}

interface IAlignSelf {
  alignSelf?: string;
}

export const Container = styled.View.attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
})<IColor>`
  height: 100px;
  width: 100px;
  background-color: ${props => props.color ?? colors.primary};
  padding: ${metrics.basePaddingLow}px;
  border-radius: ${metrics.baseRadiusLow}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<IColor>`
  color: ${props => props.color ?? colors.primaryText};
  font-size: ${metrics.fontSizeHigh}px;
`;

export const Text = styled.Text<IColor & IAlignSelf>`
  color: ${props => props.color ?? colors.primaryText};
  font-size: ${metrics.fontSizeLow}px;
  align-self: ${props => props.alignSelf ?? 'auto'};
`;
