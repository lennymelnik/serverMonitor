import React, { useState , useEffect} from 'react';
import { ScrollView } from 'react-native';

import { StyleSheet, FlatList, Button, VirtualizedList,View, SafeAreaView, Text, Alert } from 'react-native';
import Header from './components/Header'
import { uuid } from 'uuidv4'
import ListItem from './components/ListItem'



const App = () => {


const [tasks, setTasks] = useState([
  {name : "Bob", tag : "School", due : new Date()},
  {name : "Freee", tag : "School", due : new Date()},

  {name : "Fred", tag : "School", due : new Date()},

  {name : "Mercery", tag : "School", due : new Date()}])


useEffect(() =>{
   const getTasks = async () => {
       var tasksFromServer = await fetchData()
       tasksFromServer.forEach(async server => {
         console.log(server.name)
         try {

        const res = await fetch(server.address, {method : 'GET', body : null})
        server.status = await res.ok
         }
         catch(error){
          server.status = false


         }
        
    
        console.log(server.name, server.status)
      })
          
      console.log("HERE")
       setTasks(tasksFromServer)
   }
    getTasks()
}, [])

  const getServers = async () => {
    var newStatus = []
    console.log("I AM HERE", )
    for(i=0;i<tasks.length;i++){
      const statusFromServer = await fetchServer(tasks[i].address)
      console.log("Server Status", statusFromServer)
  
    }
  
  }


//get Data
const fetchData = async () => {
    const res = await fetch("http://localhost:8000/servers")
    const data = await res.json()
    return data
}


  return (
  
    <View style={styles.container}>
    
    <Header title='Monitoring App'/>
    <FlatList data={ tasks } 
    renderItem={({item}) => <ListItem item={item} getServers={getServers}/>} />

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