import React, {Component} from 'react'
import {
   View, 
   TextInput, 
   Text,
   TouchableOpacity,
   StyleSheet,
  } from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements'

export default class MyHeader extends Component{

  constructor(props){
  super(props)
  this.state={
    value: ""
  }
}
 BellIconWithBadge =()=>{
  return(
    <View>
      <Icon name = 'bell' color = 'blue' onPress={()=> props.navigation.navigate       ('NotificationScreen')}/>
      <Badge 
      value = {this.state.value}
      containerStyle ={{ position :'absolute',top: -4, right: -4}}/>
    </View>
  )
}

getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where('notification_status','==', "unread" )
  .onPressSnapshot ((snapshot)=>{
    var unreadMessage = snapshot.docs.map((doc)=>doc.data())
    this.setState({
    value: unreadMessage.length
    })
    
  })
}

  render(){
    return(
      <View>
     <Header
      centerComponent={{ text: props.title, style: { color: '#90A5A9',                 fontSize:20,fontWeight:"bold", } }}

       leftComponent= {<Icon name = 'burger' color ='#696969' onPress={()=>             props.navigation.toggleDrawer()}/>}

       rightComponent= {<BellIconWithBadge {...props} />}
      />
      </View>
    )
  }
}