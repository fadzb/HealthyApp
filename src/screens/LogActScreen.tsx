import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { ActivityForm } from '../components/ActivityForm';

interface LogActScreenProps {
  navigation: any;
}

export class LogActScreen extends React.Component<LogActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  handleGoToViewAct = () => {
    this.props.navigation.navigate('ViewAct');
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Log Activity</Title>
        </Header>
        <Content style={styles.contentContainer}>
          <ActivityForm goToViewAct={this.handleGoToViewAct} />
        </Content>
      </Container>
    );
  }
}
