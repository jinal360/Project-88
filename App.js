import React from 'react';
import { StyleSheet, Text, View, Image,} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator}from 'react-navigation-tabs';
import {CreateDrawerNavigator } from 'react-navigation-drawer'
import SignUpLoginScreen from './screen/SignUpLoginScreen'
import Homescreen from './screen/Homescreen'
import ExchangeScreen from './screen/ExchangeScreen'
import CustomSideBarMenu from './components/CustomSideBarMenu';
import SettingScreen from './screen/SettingScreen'
import db from './config';
import firebase from 'firebase';

export default class App extends React.Component {
  render(){
    return(
    <View>
<SignUpLoginScreen/>
    </View>
      )
       }
}

const TabNavigator = createBottomTabNavigator({
  ExchangeScreen:{screen:ExchangeScreen},
  Homescreen:{screen:Homescreen}
})

const AppContainer =  createAppContainer(switchNavigator);

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    Setting:{
        screen: SettingScreen
    },
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName: 'Home'
})
