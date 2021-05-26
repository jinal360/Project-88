import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class Homescreen extends Component{
    constructor(){
    super()
    this.state = {
      itemRequestList : []
    }
  this.requestRef= null
  }

  getItemRequestList =()=>{
    this.requestRef = db.collection("requested_item")
    .onSnapshot((snapshot)=>{
      var itemRequestList = snapshot.docs.map(document => document.data());
      this.setState({
        itemRequestList : itemRequestList
      });
    })
  }

  componentDidMount(){
    this.getItemRequestList()
  }

  componentWillUnmount(){
    this.requestRef();
  }
keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.item_discirption}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress={()=>{
              this.props.navigate.navigator('UserDetailsScreen')
            }}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
          {
            this.state.itemRequestList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All item</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.itemRequestList}
                renderItem={this.renderItem}
              />
            )
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})