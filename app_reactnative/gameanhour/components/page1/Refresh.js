import React, { Component } from 'react';
import { FlatList } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title ,Button } from "native-base";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export class RefreshList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.macAddrs,
      stickyHeaderIndices: []
    };
    this.token;
  }
  async setMacAddr(item) {
    //MACアドレスの一覧をサーバに要求
    console.log(item)
    console.log(this.token)
    try {
      let resp = await fetch('http://192.168.11.18:8080/monitor',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "macAddr": item,
            "token": this.token})
      })
      //MACアドレスの一覧を受信
      let responseJson = await resp.json()
      //this.str = responseJson["macAddrs"]
      console.log(responseJson)
    } catch(e) {
        console.log(e)
    }
  
  }

  async componentWillMount() {

    this.token = await registerForPushNotificationsAsync();
    var arr = [];
    
    this.setState({
      stickyHeaderIndices: arr
    });
  }
  renderItem = ({ item }) => {
  
      return (
        <ListItem style={{ marginLeft: 0 }} full onPress={_ => this.setMacAddr(item)}>
          <Body>
              <Text>{item}</Text>
          </Body>
        </ListItem>
      );
  };
  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item}
        stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
    );
  }
}


//プッシュ通知のための関数
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  Notifications.createChannelAndroidAsync('closing-message', {
    name: 'Chat message',
    sound: true,
  });

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  return token;
}
