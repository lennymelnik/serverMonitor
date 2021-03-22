import React, { useState , useEffect} from 'react';
import { ScrollView } from 'react-native';

import { StyleSheet, FlatList, Button, VirtualizedList,View, SafeAreaView, Text, Alert } from 'react-native';
import Header from './components/Header'
import { uuid } from 'uuidv4'
import ListItem from './components/ListItem'



const App = () => {


const [tasks, setTasks] = useState([])

const [refresh, setRefresh] = useState(0)

useEffect(() =>{
  console.log("Refreshing servers")

   const getTasks = async () => {
       var tasksFromServer = await fetchData()
       .then(result => getServerStatus(result))
       .then(newResult => setTasks(newResult))

       
       console.log("Done Refreshing")
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


//get Data
const fetchData = async () => {
    const res = await fetch("http://localhost:8000/servers")
    const data = await res.json()
    return data
}


  return (
  
    <View style={styles.container}>
    
    <Header title='Monitoring App' />
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