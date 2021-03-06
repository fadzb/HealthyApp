import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body, Button, Switch } from 'native-base';
import { DEFAULT_PIC } from '../utils/ProfileUtils';
import { getCurrentUser, signOut } from '../utils/FirebaseAuth/AuthUtils';
import { SwitchButton } from '../components/SwitchButton';
import { Widget, trainWidget } from '../typings/Widget';
import { dispatchUpdateWidget, getWidgetById } from '../utils/WidgetUtils';
import { connect } from 'react-redux';
import { setChoRatio, setInsulinSuggestions } from '../actions/actions';
import NumericInput from 'react-native-numeric-input';
import store from '../store';
import { getUserFromAuth } from '../utils/ChatUtils';
import { firebase } from '@react-native-firebase/auth';
import { ScrollView } from 'react-native';
import { ProfileModal } from '../components/ProfileModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ProfileScreenProps {
  navigation: any;
  widgets: Widget[];
  choRatio: number;
  insulinSuggestions: boolean;
  setChoRatio: (ratio: number) => void;
  setInsulinSuggestions: (value: boolean) => void;
  displayName: string;
  channelKey: string;
}

const profilePic = DEFAULT_PIC;

class ProfileScreen extends React.Component<ProfileScreenProps> {
  modalRef: ProfileModal | null | undefined;

  constructor(props: any) {
    super(props);
  }

  state = {
    user: getCurrentUser(),
    choRatioInput: this.props.choRatio,
    modalVisible: false,
  };

  handleWidgetChange = (widget: Widget | undefined, newValue: boolean) => {
    if (!widget) {
      console.log('Widget undefined');
      return;
    }

    // Update widget with new value (i.e. enabled/disabled)
    widget.enabled = newValue;

    // Dispatch action
    dispatchUpdateWidget(widget);
  };

  handleChoRatioInput = (value: number) => {
    this.setState({ choRatioInput: value });
    this.props.setChoRatio(value);
  };

  clearApp = () => {
    store
      .getPersistor()
      .purge()
      .then(() => console.log('App Cleared.'))
      .catch(error => console.log(error));
  };

  openProfile = () => {
    //If modal has already been opened before, update its state
    if (this.modalRef) {
      this.modalRef.setState({ modalVisible: true });
    }

    this.setState({ modalVisible: true });
  };

  // refresh to update display name
  handleModalClose = () => {
    this.setState({ user: getCurrentUser() });
  };

  render() {
    const { user } = this.state;
    const { widgets } = this.props;

    // Get widgets
    const recentLogsWidget = getWidgetById('recentLogs', widgets);
    const trainWidget = getWidgetById('Train', widgets);
    const chatWidget = getWidgetById('Chat', widgets);

    return (
      <ScrollView>
        {/* Profile */}
        <TouchableOpacity onPress={this.openProfile}>
          <Card>
            <CardItem>
              {this.state.modalVisible && (
                <ProfileModal
                  navigation={this.props.navigation}
                  handleModalClose={this.handleModalClose}
                  ref={ref => (this.modalRef = ref)}
                  user={this.state.user}
                  channelKey={this.props.channelKey}
                />
              )}
              <Left>
                <Thumbnail source={profilePic} />
                <Body>
                  <Text>{user.displayName || 'No Display Name'}</Text>
                  <Text note>{user.email}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>

        {/* Widgets */}
        <Card>
          <CardItem header bordered>
            <Text>Dashboard Widgets Enabled</Text>
          </CardItem>

          <CardItem bordered>
            <SwitchButton widget={recentLogsWidget} handleChange={this.handleWidgetChange} />
          </CardItem>
          <CardItem bordered>
            <SwitchButton widget={trainWidget} handleChange={this.handleWidgetChange} />
          </CardItem>
          <CardItem bordered>
            <SwitchButton widget={chatWidget} handleChange={this.handleWidgetChange} />
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Carbohydrate Counting</Text>
          </CardItem>

          {/* Enable/ Disable */}
          <CardItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Enable Insulin Suggestions: </Text>
            <Switch
              value={this.props.insulinSuggestions}
              onValueChange={this.props.setInsulinSuggestions}
            ></Switch>
          </CardItem>

          {this.props.insulinSuggestions && (
            <CardItem>
              <Text>Insulin : Carb Ratio </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                <Text>1 Unit : </Text>
                <NumericInput
                  value={this.state.choRatioInput}
                  type="up-down"
                  onChange={this.handleChoRatioInput}
                  totalWidth={100}
                  step={0.5}
                  valueType="real"
                  rounded
                />
                <Text> g</Text>
              </View>
            </CardItem>
          )}
        </Card>

        {/* Other Settings */}
        <Card>
          <CardItem header bordered>
            <Text>Other Settings</Text>
          </CardItem>

          {firebase.auth().currentUser ? (
            <CardItem>
              <Button style={{ backgroundColor: 'orange' }} onPress={() => signOut()}>
                <Text>Logout</Text>
              </Button>
            </CardItem>
          ) : (
            <CardItem>
              <Button onPress={() => this.props.navigation.navigate('Login')}>
                <Text>Sign in</Text>
              </Button>
            </CardItem>
          )}

          <CardItem>
            <Button danger onPress={this.clearApp}>
              <Text>Clear App Memory</Text>
            </Button>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    widgets: state.widgets,
    logs: state.logs,
    choRatio: state.choRatio,
    insulinSuggestions: state.insulinSuggestions,
    channelKey: state.channelKey,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setChoRatio: (ratio: number) => {
      dispatch(setChoRatio(ratio));
    },
    setInsulinSuggestions: (value: boolean) => {
      dispatch(setInsulinSuggestions(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
