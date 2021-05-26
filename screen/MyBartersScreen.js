import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class MyBarters extends Component{

      sendNotification = (bookDetails,requestStatus)=>{
        var requestId = bookDetails.request_id
        var donorId = bookDetails.donor_Id
        db.collection("all_notification")
        .where("user_id","==",userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                if(requestStatus === "Item Sent"){
                    message = this.state.userName+"has sent you item"
                }
            })
        })
    }
  render(){
    return(
      <View>
      </View>
    )
  }
}