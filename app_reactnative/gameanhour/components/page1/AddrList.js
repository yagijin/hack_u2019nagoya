import React, { Component } from 'react';
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';

export class MACAddrList extends Component {
    //コンストラクタ
    constructor(props){
        super(props);
    }
    render() {
      return (
        <List>
            <ListItem itemDivider>
                <Text>MACAddr1</Text>
            </ListItem>
            <ListItem itemDivider>
                <Text>MACAddr2</Text>
            </ListItem>
            <ListItem itemDivider>
                <Text>MACAddr3</Text>
            </ListItem>
        </List>
        );
    }
}