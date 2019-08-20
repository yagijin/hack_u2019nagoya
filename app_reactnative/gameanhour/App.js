import React from 'react';
import { AppLoading } from 'expo';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Form, Input } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Mainscreen } from './components/page1/Mainscreen.js';
import { GetMACAddr } from './components/page1/GetMAC.js';
import * as Permissions from 'expo-permissions';
import { createMaterialTopTabNavigator ,createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Manual: {
      screen: Mainscreen,
    },
    Auto: {
      screen: GetMACAddr,
    },
  },
  {
    initialRouteName: "Manual"
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      text:""
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    await this.sleep(2000);
    this.setState({ isReady: true });
  }

  sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
  
    return <AppContainer />;
  }
}