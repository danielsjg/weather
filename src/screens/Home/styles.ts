// Libraries
import styled from 'styled-components/native';

interface IColor {
  color?: string;
}

interface IAlignSelf {
  alignSelf?: string;
}

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const SafeContainer = styled.SafeAreaView`
  flex: 2;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.metrics.basePaddingMedium}px;
  padding-bottom: 0px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const CardsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.metrics.baseMargin}px 0px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Footer = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.metrics.basePaddingMedium}px;
  background-color: ${({ theme }) => theme.colors.quaternary};
  border-top-left-radius: ${({ theme }) => theme.metrics.baseRadiusMedium}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.baseRadiusMedium}px;
`;

export const TitleLeftContent = styled.View`
  flex: 2;
  align-items: flex-start;
`;

export const TitleRightContent = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text<IColor>`
  color: ${props => props.color ?? props.theme.colors.primaryText};
  font-size: ${({ theme }) => theme.metrics.fontSizeHigh}px;
`;

export const Subtitle = styled.Text<IColor>`
  color: ${props => props.color ?? props.theme.colors.primaryText};
  font-size: ${({ theme }) => theme.metrics.fontSizeMedium}px;
`;

export const Text = styled.Text<IColor & IAlignSelf>`
  color: ${props => props.color ?? props.theme.colors.primaryText};
  font-size: ${({ theme }) => theme.metrics.fontSizeLow}px;
  align-self: ${props => props.alignSelf ?? 'auto'};
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.metrics.baseMargin}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Loading = styled.ActivityIndicator.attrs({ size: 'large' })`
  margin: ${({ theme }) => theme.metrics.baseMargin}px;
`;
