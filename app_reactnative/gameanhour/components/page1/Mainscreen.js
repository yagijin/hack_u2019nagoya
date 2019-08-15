import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Form, Item, Input, CheckBox } from 'native-base';
import { setMacAddr } from './Refreshbutton.js';
import { registerForPushNotificationsAsync } from './GetTokenNotify.js';

export class Mainscreen extends Component {
    //コンストラクタ
    constructor(props){
        super(props);
        this.state = {
          checkedAndroid: false,
          checkedGoogleHome: false,
          text: "Target MAC Address"
        };
        (async ()=>{
          let token = await registerForPushNotificationsAsync()
          this.token = token
        })()
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

    render() {
      return (
        <Container>
          <Header>
            <Body>
              <Title>Limited An Hour Per A Day</Title>
            </Body>
          </Header>
          <Content>
            <ListItem>
              <Body>
                <Text>
                  Type Target MAC Address below. If You Don`t Know Target`s MAC Address, You Can Search It Using The Other Tab.  
                </Text>
              </Body>
            </ListItem>
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
              <Form>
                  <Input onChangeText={(text) => this.setState({text})} value={this.state.text}/>
              </Form>
            </ListItem>
          </Content>
          <Footer>
            <FooterTab>
              <Button full onPress={_ => setMacAddr(this.state.text,this.token,(this.state.checkedAndroid && this.state.checkedGoogleHome)?"both":(this.state.checkedAndroid)?"android":"ghome")}>
                <Text>Set Target to Notify</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }