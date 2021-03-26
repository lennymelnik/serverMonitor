import React, { useState , useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import { StyleSheet, Button, VirtualizedList,View, SafeAreaView, Text, Alert, TextInput, TouchableOpacity} from 'react-native';


const AddItem = ({addItem}) => {
    const [server, setServer] = useState({})

    const onChangeName = textValue => {
        var tempServer = server
        tempServer.name = textValue
        setServer(tempServer)
    }
    const onChangeAddress = textValue => {
        var tempServer = server
        tempServer.address = textValue
        setServer(tempServer)
    }
    return (
        <View style={styles.header}>
         
            <TextInput placeholder="Name..." style= {styles.input} onChangeText={onChangeName}/>
            <TextInput placeholder="Server Address..." style= {styles.input} onChangeText={onChangeAddress}/>


            <TouchableOpacity styles= {styles.btn} onPress={() => addItem(server)}>
            <Text style={styles.btnText}><Icon name="plus" size={15}/><Icon name="server" size={20}/>Add Server</Text>


            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        margin: 5,
        backgroundColor: '#f8f8f8',
        fontSize : 20
      },
      btn: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        margin: 5,
      },
      btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
      }
   
})

export default AddItem
