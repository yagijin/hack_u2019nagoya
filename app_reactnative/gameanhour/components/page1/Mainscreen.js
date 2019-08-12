import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import  { MACAddrList } from './AddrList.js';

export class Mainscreen extends Component {
    //コンストラクタ
    constructor(props){
        super(props);
    }
    render() {
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
            <MACAddrList />
          </Content>
          <Footer>
            <FooterTab>
            <Button full onPress={_ => this.props.navigation.navigate('Details')}>
                <Text>Refresh</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }