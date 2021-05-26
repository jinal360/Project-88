import React,{Component} from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   Dimensions
   } from 'react-native';

    export default class SwipeableFlatlist extends Component{

      constructor(props){
        super(props);
        this.state={
            allNotifications:this.props.allNotifications,
        }
    }

       updateMarkAsread = notification =>{
        db.collection("all notifications")
        .doc(notification.doc.id)
        .update({
            allNotifications_status : "read"
        });
    };

   onSwipeValueChange = swipeData =>{
       var allNotifications = this.state.allNotifications;
       const{key,value} = swipeData;
       if(value < - Dimensions.get("window".width)){
           const newData= [...allNotifications];
            this.updatemarkAsread(allNotifications[key]);
            newData.splice(key,1);
            this.setState({allNotifications:newData})
       }
   }

   renderItem = data => (

     <ListItem
     title={data.item.item_name}
     titleStyle={{ color: 'black', frontWeight: 'bold'}}
     subtitle={data.item.message}
     bottomDivider
     />
   );

   renderHiddenItem = () => (
     <View>
     <View>
     <Text> </Text>
     </View>
     </View>
   )
   
      render(){
        return(
         <View>
         <SwipeableFlatlist
         disableRightSwipe
         data={this.state.allNotifications}
         renderItem={this.renderIem}
         renderHiddenItem={this.renderHiddenItem}
         rightOpenValue={-Dimensions.get('window').width}
         previewRowKey={'0'}
         previewOpenValue={-40}
         previewOpenDelay={3000}
         onSwipeValueChange={this.onSwipeValueChange}
         />
         </View> 
        )
      }
    }
