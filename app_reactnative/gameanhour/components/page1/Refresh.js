import React, { Component } from 'react';
import { FlatList } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title ,Button } from "native-base";

export class RefreshList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.macAddrs,
      stickyHeaderIndices: []
    };
  }
  async setMacAddr(item) {
    //MACアドレスの一覧をサーバに要求
    console.log(item)
    try {
      let resp = await fetch('http://192.168.11.18:8080/set_mac_address',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"macAddr": item})
      })
      //MACアドレスの一覧を受信
      let responseJson = await resp.json()
      //this.str = responseJson["macAddrs"]
      console.log(responseJson)
    } catch(e) {
        console.log(e)
    }
  
  }
  
  componentWillMount() {
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
