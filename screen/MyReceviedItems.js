import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Image,
    TextInput, 
    TouchableOpacity,
    Alert,
    Modal,
    KeyboardAvoidingView,
     } from 'react-native';
    import firebase from 'firebase';
    import db from '../config'

    export default class MyReceviedItems extends Components{
constructor(){
      super()
    this.state = {
      itemReceviedtList : []
    }
}
  render(){
    return(
      <View style={{flex:1}}>
          {
            this.state.itemReceviedtList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Item Recevied</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.itemReceviedtList}
                renderItem={this.renderItem}
              />
            )
          }
      </View>
    )
  }
}
