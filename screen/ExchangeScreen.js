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

     export default class ExchangeScreen extends React.Component{

     componetDidMount(){
    var books = BookSearch.searchbook(bookName,
'http://data.fixer.io/api/latest?access_key=1f7dd48123a05ae588283b5e13fae944&format=1')
  }

  getIsExchangeRequestActive(){
    db.collection('users')
    .where('username','==',this.state.userName)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.setState({
          isExchangeRequestActive:doc.data().IsExchnageRequestActive,
          userDocId: Doc.id
        })
      })
    })
  }

  getExchangeRequest =()=>{
    var exchangeRequest = db.collection('exchange_request')
    .where('username','==',this.state.userName)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.data().item_status !== "recevied"){
          this.setState({
            exchangeId:doc.data().exchangeId,
            requestedItemName:doc.data().item_name,
            itemStatus:doc.data().item_status,
            docId:doc.id
          })
        }
      })
    })
  }
     createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addItem =(bookName,reasonToRequest)=>{
    var itemName = this.state.itemName
    var itemDescription = this.state.itemDescription
    db.collection('exchange_item').add({
        "item_name":itemName,
        "item_discirption":itemDescription,
        "exchange_Id":randomExchangeId,
    })

    this.setState({
        itemName :'',
        itemDescription : ''
    })

        return Alert.alert("Exchanged item Successfully")
  }

  getData(){
    fetch("http://data.fixer.io/api/latest?access_key=1f7dd48123a05ae588283b5e13fae944&format=1")
    .then(response=>{
      return response.json();
    }).then(responseData =>{
      var currencyCode = this.state.currencyCode
      var currency = responseData.rates.INR
      var value = 69 / currency
      console.log(value)
    })
  }

    async getBooksFromApi(bookName){
    this.setState({bookName:bookName})
    if(bookName.length>2){
      var books = BookSearch.searchbook(bookName, 'http://data.fixer.io/api/latest?access_key=1f7dd48123a05ae588283b5e13fae944&format=1')
    }
  }

      
       render(){
      
           if(this.state.IsExchangeRequestActive){
             return(
               <View style={{flex:1,justifyContent:'center'}}>
               <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignContent:'center',margin:10}}>
               <Text> Item Name</Text>
               <Text>{this.state.requestItemName}</Text>  
               </View>
               <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItem:'center',margin:10}}>
               <Text> Item Status</Text>
               <Text>{this.state.itemStatus}</Text>
               </View>

<TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,margin:10}}
onPress={()=>{
  this.sendNotification()
  this.updateExchangeRequestStatus();
  this.receviedItem(this.state.ItemName)
}}>
<Text>I recevied the item</Text>

</TouchableOpacity>
               </View>
             )
           }
           else{
             return(
               <View style={{flex:1}}>
               <MyHeader title="Add Item" navigation={this.props.navigation}/>
               <KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItem:'center'}}>

            <TextInput
                style ={styles.formTextInput}
                placeholder={"item name"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}
                value={this.state.itemName}
                />

                     <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"wirte item description"}
                onChangeText ={(text)=>{
                    this.setState({
                      itemDescription:text
                    })
                }}
                value ={this.state.itemDescription}
                />

                <TouchableOpacity
                style={styles.button}
                 onPress={()=>{this.addItem(this.state.itemName,                               this.state.itemDescription)}}
                >
                <Text>Exchange</Text>
              </TouchableOpacity>
           </KeyboardAvoidingView>
           </View>
         )
       }

     }
     }

     const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)