import React, { Component } from 'react';
import { FlatList, ToastAndroid } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title, Button, Spinner, CheckBox, Content, Form, Input} from "native-base";
import { registerForPushNotificationsAsync } from './GetTokenNotify.js';

export class RefreshList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [],
      checkedAndroid: false,
      checkedGoogleHome: false
    };
    this.token;
  }
  
  async setMacAddr(item) {
    //監視するMACアドレスを設定
    let texttoast = "";
    try {
      let resp = await fetch('http://' + this.props.iptext + ':8080/monitor',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "macAddr": item,
            "token": this.token,
            "notifyType": (this.state.checkedAndroid && this.state.checkedGoogleHome)?"both":(this.state.checkedAndroid)?"android":"ghome",
            "googlehomeip":this.props.googlehomeip
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

  async checker1() {
    this.setState({
      checkedAndroid:!this.state.checkedAndroid
    })
  }

  async checker2() {
    this.setState({
      checkedGoogleHome:!this.state.checkedGoogleHome
    })
  }

  _renderItem = ({item}) => (
    <ListItem style={{ marginLeft: 0 }} full onPress={_ => this.setMacAddr(item.macadd)}>
    <Body>
        <Text>{item.macadd} {"\n"} {item.vendor}</Text>
    </Body>
  </ListItem>
  )
  render() {
    //完成したリストを返す
    if (this.props.isReady) {
      return (
        <Content>
            <ListItem>
              <Body>
                <Text>
                  Notification Device 
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox onPress={_ => this.checker1()} checked={this.state.checkedAndroid} />
              <Body>
                <Text>This App</Text>
              </Body>
              <CheckBox onPress={_ => this.checker2()} checked={this.state.checkedGoogleHome} />
              <Body>
                <Text>Google Home</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>
                  Push Refresh Button and Select Any MAC Address You Wanna Follow.
                </Text>
              </Body>
        </ListItem>
        <FlatList
          data={this.props.macAddrs}
          renderItem={this._renderItem}
          keyExtractor={(item,index) => index.toString()}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
        </Content>
      );
    }
    return (
      <Content>
            <ListItem>
              <Body>
                <Text>
                  Notification Device 
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox onPress={_ => this.checker1()} checked={this.state.checkedAndroid} />
              <Body>
                <Text>This App</Text>
              </Body>
              <CheckBox onPress={_ => this.checker2()} checked={this.state.checkedGoogleHome} />
              <Body>
                <Text>Google Home</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>
                  Push Refresh Button and Select Any MAC Address You Wanna Follow.
                </Text>
              </Body>
        </ListItem>
        <Spinner></Spinner>
      </Content>
    )
  }
}