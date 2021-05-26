import Rect, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';

export default class UserDetailsScreen extends Component{
     constructor(){
      super()
    this.state={
      emailId   : '',
      firstName : '',
      lastName  : '',
      address   : '',
      contact   : '',
      docId     : '',
        recieverId:this.props.navigation.getParam('details')["user_id"],
     }
}
  getUserDetails=()=>{
    var email = firebase.auth().currentUser.email;
    db.collection('users').where('email_id','==',email).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      var data = doc.data()
        this.setState({
          emailId   : data.email_id,
          firstName : data.first_name,
          lastName  : data.last_name,
          address   : data.address,
          contact   : data.contact,
          docId     : doc.id
        })
      });
    })
  }

  addBarters=()=>{
    db.collection("my_barters").add({
    "exchange_id":this.state.exchangeId,
    "item_name": this.state.itemName,
    "exchanger_name":this.state.exchangerName,
    "exchanger_contact":this.state.exchangerContact,
    "exhanger_address":this.state.exchangerAddrees,
    "exchange_status":this.state.exchangeStatus,
    })
}

addNotification=()=>{
    var message = this.state.userName+"has shown interest in exchanging the item"
    db.collection("all_notification").add({
 "targeted_user_id": this.state.receiverId,
 "donor_id": this.state.userId,
 "exchange_id": this.state.exchangeId,
 "item_name": this.state.itemName,
 "date": firebase.firestore.FieldValue.serverTimestamp(),
 "notification_status": "unread",
 "message": message
    })
}

getNotification=()=>{
  this.requestRef = db.collection("all_notifications")
  .where("notification_status", "==", "unread")
  .where("targeted_user_id", '==',this.state.userId)
  .onSnapshot((snapshot)=>{
    var allNotifications = []
    snapshot.docs.map((doc) =>{
      var notification = doc.data()
      notification["doc_id"] = doc.id
      allNotification.push(notification)
    });
    this.setState({
      allNotifications : allNotifications
    })
  })
}

  componentDidMount() {
    this.getData();
  }

 render(){
     return(
         <View style= {{ flex:1}}>
           <View style= {{ flex:0.9}}>
         {
           this.state.allNotifications.length === 0
           ?(
             <View style ={{flex:1, justifyContent:'center', alignItems:'center'}}>
             <Text style= {{fontSize:25}}> You have no notifications</Text>
              </View>
           )
           :(
             <FlatList
             keyExtractor= {this.keyExtractor}
             data={this.state.allNotifications}
             renderItem={this.renderItem}
             />
           )
         }
         </View> 
        <TouchableOpacity
         onPress={()=>{
          this.addBarters,
          this.addNotification
        }}>
         <Text style={botton.contanier}> exchange</Text>
         </TouchableOpacity>
         </View>
     )  
 }
}