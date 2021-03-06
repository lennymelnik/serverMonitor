import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'




const IfOnline = ({item}) => {
   
    if(item.status){
        return (
            <View>
            <Icon name="rss-feed" size = {20} color = "firebrick"/>     
            <Text>Online</Text></View>
                )
    }else{
        return (
            <View>
            <Icon name="portable-wifi-off" size = {20} color = "firebrick" />     
            <Text>Offline</Text></View>

                )
    }
  
  
  }
  
const ListItem = ({item, refresh, setRefresh, }) => {
  
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => setRefresh(refresh + 1) }>
            <View style={styles.listItemView}>
            <Text style={styles.listItemText}>{item.name}</Text>
            <IfOnline item = { item }/>
</View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    listItem :{
        padding : 15,
        backgroundColor : "#f8f8f8",
        borderBottomWidth : 1,
        borderColor : "#EEE"
    },
    listItemView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    listItemText : {
        fontSize : 18
    }
})

export default ListItem
