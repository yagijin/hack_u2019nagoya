import React, { Component } from 'react';
import { FlatList, ToastAndroid } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title ,Button,Spinner } from "native-base";
import { registerForPushNotificationsAsync } from './GetTokenNotify.js';

export class RefreshList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [],
    };
    this.token;
  }
  
  async setMacAddr(item) {
    //監視するMACアドレスを設定
    let texttoast = "";
    try {
      let resp = await fetch('http://192.168.11.36:8080/monitor',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "macAddr": item,
            "token": this.token,
            "notifyType": "android",
          })
      })
      texttoast = "You Set " + item;
    } catch(e) {
        console.log(e)
        texttoast = "You Have to Connect With Local Network.";
    }
    await ToastAndroid.show(texttoast, ToastAndroid.SHORT);
  }

  async componentWillMount() {
    this.token = await registerForPushNotificationsAsync();
    var arr = [];
      this.setState({
        stickyHeaderIndices: arr
      });
  }
  _renderItem = ({item}) => (
    <ListItem style={{ marginLeft: 0 }} full onPress={_ => this.setMacAddr(item.macadd)}>
    <Body>
        <Text>{item.macadd} {"   "} {item.vendor}</Text>
    </Body>
  </ListItem>
  )
  render() {
    //完成したリストを返す
    if (this.props.isReady) {
      return (
        <FlatList
          data={this.props.macAddrs}
          renderItem={this._renderItem}
          keyExtractor={item => item.macadd}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
      );
    }
    return (
      <Spinner></Spinner>
    )
  }
}