import React, { Component } from 'react';
import { FlatList ,ToastAndroid } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title ,Button } from "native-base";

export async function setMacAddr(item, token, type, ipaddr, googlehomeip) {
    console.log(item);
    console.log(token);
    console.log(type);
    //MACアドレスの一覧をサーバに要求
    try {
      let resp = await fetch('http://'+ ipaddr +':8080/monitor',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "macAddr": item,
            "token": token,
            "notifyType": type,
            "googlehomeip": googlehomeip
          })
      })
      //MACアドレスの一覧を受信
      console.log(resp)
      let responseJson = await resp//.json()
      //this.str = responseJson["macAddrs"]
      console.log(responseJson)
    } catch(e) {
        console.log(e)
    }
    await ToastAndroid.show("Success", ToastAndroid.SHORT);
  };
