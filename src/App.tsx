import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addName } from './actions/actions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';

// TODO: May need to add async functions to wait for fonts for Native Base: https://github.com/GeekyAnts/NativeBase
// TODO: Need to sort out redux

// const state = {
//   name: 'user',
// };

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',

    //style the header if decide to render in future
    defaultNavigationOptions: {
      headerShown: false,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <View style={{ flex: 1 }}>
    <AppContainer />
  </View>
);

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch: (dispatch: any) => void) => {
  return {
    addName: (name: any) => {
      dispatch(addName(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
