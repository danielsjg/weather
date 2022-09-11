// Libraries
import styled from 'styled-components/native';

// Styles
import { colors, metrics } from '~/styles';

interface IColor {
  color?: string;
}

interface IAlignSelf {
  alignSelf?: string;
}

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  background-color: ${colors.primary};
`;

export const SafeContainer = styled.SafeAreaView`
  flex: 2;
`;

export const Container = styled.View`
  flex: 1;
  padding: ${metrics.basePaddingMedium}px;
  padding-bottom: 0px;
  background-color: ${colors.primary};
`;

export const CardsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${metrics.baseMargin}px 0px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Footer = styled.View`
  flex: 1;
  padding: ${metrics.basePaddingMedium}px;
  background-color: ${colors.quaternary};
  border-top-left-radius: ${metrics.baseRadiusMedium}px;
  border-top-right-radius: ${metrics.baseRadiusMedium}px;
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
  background-color: ${colors.primary};
`;

export const Title = styled.Text<IColor>`
  color: ${props => props.color ?? colors.primaryText};
  font-size: ${metrics.fontSizeHigh}px;
`;

export const Subtitle = styled.Text<IColor>`
  color: ${props => props.color ?? colors.primaryText};
  font-size: ${metrics.fontSizeMedium}px;
`;

export const Text = styled.Text<IColor & IAlignSelf>`
  color: ${props => props.color ?? colors.primaryText};
  font-size: ${metrics.fontSizeLow}px;
  align-self: ${props => props.alignSelf ?? 'auto'};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: ${metrics.baseMargin}px;
  background-color: ${colors.primary};
`;

export const Loading = styled.ActivityIndicator.attrs({ size: 'large' })`
  margin: ${metrics.baseMargin}px;
`;

export const PermissionContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: ${metrics.baseMargin}px;
  background-color: ${colors.primary};
`;

export const FailedContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: ${metrics.baseMargin}px;
  background-color: ${colors.primary};
`;
