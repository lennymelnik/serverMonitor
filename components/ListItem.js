import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

const ListItem = ({item, getServers}) => {
    return (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
            <Text style={styles.listItemText}>{item.name}{item.address}</Text>
<Icon name="rss-feed" size = {20} color = "firebrick" onPress={() => getServers() }/>     
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
