import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation-stack'
import UserDetailsScreen from '/screen/UserDetailsScreen';

export const AppStackNavigator = createStackNavigator({
    CustomSideBarMenu:{
        screen:CustomSideBarMenu,
        navigationOptions:{
            headerShown:false
        }
    },

    UserDetailsScreen:{
        screen:UserDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    
},
{
    initialRouteName: 'CustomSideBarMenu'
}
)
    