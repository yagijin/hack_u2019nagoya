import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem,Spinner,Form,Input } from 'native-base';
import { AppLoading } from 'expo';
import { RefreshList } from './Refresh.js';

export class GetMACAddr extends Component {
    constructor(props){
        super(props); 
        this.state = {
            isReady: false,
            str: [],
            lastUpdate:Date(),
            iptext: 'Server  IP  Address',
            googlehomeip: 'GoogleHome IP Address'
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

    let resp = await fetch('http://' + this.state.iptext + ':8080/get_mac_list',{
        method:"GET"
    })
    let respJSON = await resp.json()
    console.log("1");
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
              <Title>MACアドレスを選択する場合</Title>
            </Body>
          </Header>
          <Content>
            <ListItem>
              <Form>
                  <Input onChangeText={(iptext) => this.setState({iptext})} value={this.state.iptext}/>
              </Form>
              <Form>
                  <Input onChangeText={(googlehomeip) => this.setState({googlehomeip})} value={this.state.googlehomeip}/>
              </Form>
            </ListItem>
            <RefreshList macAddrs={this.state.str} isReady={this.state.isReady} iptext={this.state.iptext} googlehomeip={this.state.googlehomeip}/>
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

