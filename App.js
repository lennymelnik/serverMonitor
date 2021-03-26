import React, { useState , useEffect} from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, FlatList, Button, VirtualizedList,View, Text, Alert } from 'react-native';
import Header from './components/Header'
import uuid from 'react-uuid'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'

import { db , firebase} from './firebase'

const App = () => {

const [tasks, setTasks] = useState([])

const [refresh, setRefresh] = useState(0)


useEffect(() =>{
  console.log("Refreshing servers")

   const getTasks = async () => {

      const response = db.collection("servers")

      const data = await response.get()
      var allServers = []
      data.docs.forEach(item=>{
        console.log("Data: ",item.data())
        allServers.push(item.data())

       })
       getServerStatus(allServers).then((result)=>{
         setTasks(result)
       })
      
      
   }
   getTasks()
  
}, [ refresh ])


const getServerStatus = async (allServers) => {

  var newList = []
  for (let i = 0; i < allServers.length; i++) {
    try {
      const res = await fetch(allServers[i].address, {method : 'GET', body : null})
      allServers[i].status = await res.ok
      console.log(allServers[i].status)
      
    } catch (error) {
      allServers[i].status = false
      
    }
    newList.push(allServers[i])

  

     
    }

 console.log("ALL SERVERS", newList)
   


return newList
}

const addItem = async (item) => {
  
  if(!item.name || !item.address){
    Alert.alert('Error','Please fill out all the fields',{Text:'Ok'})
   
  
  }else{
   const newServer = {
    name: item.name,
    address: item.address,
    id : uuid()
  }
db.collection("servers").add(newServer)
.then((docRef) => {
  setTasks([...tasks, newServer])
console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
  }
  
}

//get Data
const fetchData = async () => {
  console.log("FETCHING ALL SERVERS")

    const res = await fetch("http://74.208.22.236:8080/servers")
    const data = await res.json()
    return data
}


  return (
  
    <View style={styles.container}>
    
    <Header title='Monitoring App' />
    <AddItem addItem={addItem}/>
    <FlatList data={ tasks } 
    renderItem={({item}) => <ListItem item={item} setRefresh={setRefresh} refresh={ refresh }/>} />

    </View>
  
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : 60
  
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default App;