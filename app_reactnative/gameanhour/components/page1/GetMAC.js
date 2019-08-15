import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem,Spinner } from 'native-base';
import { AppLoading } from 'expo';
import { RefreshList } from './Refresh.js';

export class GetMACAddr extends Component {
    constructor(props){
        super(props); 
        this.state = {
            isReady: false,
            str: [],
            lastUpdate:Date()
        };
    }

    async componentWillMount() {
      //MACアドレスの一覧をサーバに要求
      this.setState({ isReady: true });
    }

  async test(){
    this.setState({
      isReady : false
    })

    let resp = await fetch('http://192.168.11.36:8080/get_mac_list',{
        method:"GET"
    })
    let respJSON = await resp.json()

    //MACアドレスの一覧を受信
    this.setState({
      str:respJSON.macAddrs,
      lastUpdate:Date(),
      isReady:true
    })
  }
  render() {
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
              Push Refresh Button and Select Any MAC Address You Wanna Follow.
            </Text>
            <RefreshList macAddrs={this.state.str} isReady={this.state.isReady} />
          </Content>
          <Footer>
            <FooterTab>
            <Button full onPress={_ => this.test()}>
                <Text>Refresh</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}

