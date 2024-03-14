import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Details = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();

    const updateTodo = () => {
        if (textHeading && textHeading.length > 0) {
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then (() => {
                navigation.navigate('Home')
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style = {styles.textField}
                onChangeText = {onChangeHeadingText}
                value = {textHeading}
                placeholder = "Update Task"
            />
            <Pressable
                style = {styles.buttonUpdate}
                onPress = {() => {updateTodo()}}
            >
                <Text> Update Task </Text>
            </Pressable>
        </View>
    )

}

export default Details


const styles = StyleSheet.create({
    container:{
        marginTop: 350,
        marginLeft: 15,
        marginRight: 15
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 10,
        color: '#000000',
        backgroundColor: '#e0e0e0',
        borderRadius: 5
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#0de065'
    }

})

