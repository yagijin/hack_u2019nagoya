import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import { AppLoading } from 'expo';
import { RefreshList } from './Refresh.js';

export class GetMACAddr extends Component {
    constructor(props){
        super(props); 
        this.state = {
            isReady: false,
            str: []
        };
    }

  async componentWillMount() {
    //MACアドレスの一覧をサーバに要求
    console.log("これからリクエストを開始")
    try {
        let resp = await fetch('http://192.168.11.18:8080/get_mac_list',{
            method:"GET"
        })
        //MACアドレスの一覧を受信
        let responseJson = await resp.json()
        this.str = responseJson["macAddrs"]
        console.log(this.str)
    } catch(e) {
        console.log(e)
    }
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
        return <AppLoading />;
    }
    //受け取ったMACアドレスの一覧をリストにして分割して表示
    return (
        <Container>
          <Header>
            <Body>
              <Title>MACアドレスの選択</Title>
            </Body>
          </Header>
          <Content>
            <Text>
              Select Any MAC Address You Wanna Follow.
            </Text>
            <RefreshList macAddrs={this.str} />
          </Content>
        </Container>
    );
  }
}

