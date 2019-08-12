import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';

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
              <Title>ゲームは1日1時間</Title>
            </Body>
          </Header>
          <Content>
            <Text>
              以下のREFRESHを押すとローカルネットワーク内のMACアドレス一覧が取得できます．
              お好みのMACアドレスをタップして通知を受信する設定をしてください．
            </Text>
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