import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from './LoginScreen';
import { CarbScreen } from './CarbScreen';
import { LogActScreen } from './LogActScreen';
import { TrainScreen } from './TrainScreen';
import { ViewActScreen } from './ViewActScreen';
import Button from '../components/Button';

interface HomeScreenProps {
  navigation: any;
}

const labels = {
  LOGIN: 'Login',
  CARB: 'Estimate CHO',
  LOG_ACT: 'Log Activity',
  VIEW_ACT: 'View Activity',
  TRAIN: 'Training Modules',
};

class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: any) {
    super(props);
  }

  handleLoginNav = () => {
    this.props.navigation.navigate('Login', {});
  };

  handleEstimateNav = () => {
    this.props.navigation.navigate('Carb', {});
  };

  handleLogActNav = () => {
    this.props.navigation.navigate('LogAct', {});
  };

  handleViewActNav = () => {
    this.props.navigation.navigate('ViewAct', {});
  };

  handleTrainNav = () => {
    this.props.navigation.navigate('Train', {});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Home Screen</Text>
        <Button label={labels.LOGIN} onPress={this.handleLoginNav} />
        <Button label={labels.CARB} onPress={this.handleEstimateNav} />
        <Button label={labels.LOG_ACT} onPress={this.handleLogActNav} />
        <Button label={labels.VIEW_ACT} onPress={this.handleViewActNav} />
        <Button label={labels.TRAIN} onPress={this.handleTrainNav} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Carb: CarbScreen,
    LogAct: LogActScreen,
    ViewAct: ViewActScreen,
    Train: TrainScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
