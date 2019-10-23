import React, { Component } from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import { LoginScreen } from './screens/LoginScreen';

export class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          {/* LOGIN SCREEN */}
          {/* <Stack key='login' type={ActionConst.REPLACE} hideNavBar> */}
          <Scene component={LoginScreen} />
          {/* </Stack> */}
        </Stack>
      </Router>
    );
  }
}