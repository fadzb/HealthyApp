import * as React from 'react';
import { View, Switch, Text, Badge } from 'native-base';
import { Widget } from '../typings/Widget';
import { TouchableOpacity } from 'react-native';

interface ActivityAddButtonProps {
  handlePress: () => void;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
}

export default class ActivityAddButton extends React.Component<ActivityAddButtonProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  render() {
    const { success, info, warning } = this.props;

    return (
      <TouchableOpacity style={{ margin: 10 }} onPress={this.props.handlePress}>
        <Badge success={success} info={info} warning={warning} style={{ height: 40, width: 200 }}>
          {this.props.children}
        </Badge>
      </TouchableOpacity>
    );
  }
}