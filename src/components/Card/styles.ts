import styled from 'styled-components/native';

interface IColor {
  color?: string;
}

interface IAlignSelf {
  alignSelf?: string;
}

export const Container = styled.View.attrs(({ theme }) => ({
  shadowColor: theme.colors.black,
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
}))<IColor>`
  height: 100px;
  width: 100px;
  background-color: ${props => props.color ?? props.theme.colors.primary};
  padding: ${({ theme }) => theme.metrics.basePaddingLow}px;
  border-radius: ${({ theme }) => theme.metrics.baseRadiusLow}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<IColor>`
  color: ${props => props.color ?? props.theme.colors.primaryText};
  font-size: ${({ theme }) => theme.metrics.fontSizeHigh}px;
`;

export const Text = styled.Text<IColor & IAlignSelf>`
  color: ${props => props.color ?? props.theme.colors.primaryText};
  font-size: ${({ theme }) => theme.metrics.fontSizeLow}px;
  align-self: ${props => props.alignSelf ?? 'auto'};
`;
