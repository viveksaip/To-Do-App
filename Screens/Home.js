import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Touchable, Pressable } from 'react-native'
import React, {useState, useEffect } from 'react'
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData, setAddData] = useState('') ;
  const navigation = useNavigation();

  //fetch or read the data from firestore
  useEffect( () => {
    todoRef
    .orderBy('createdAt','desc')
    .onSnapshot(
        querySnapshot => {
            const todos = []
            querySnapshot.forEach((doc) => {
                const {heading} = doc.data()
                todos.push({
                    id: doc.id,
                    heading,
                })
            })
            setTodos(todos)
        }
    )
  }, [])

  //delete a todo from firestore db
  const deleteTodo = (todos) => {
    todoRef
    .doc(todos.id)
    .delete()
    /*
    .then( () => {
        //show a succesful alert
        alert("Deleted Successfully")
    })
    */
    .catch(error => { alert(error); })

  }

  //add a todo
  const addTodo = () => {
    // check if we have a todo enterted
    if (addData && addData.length > 0){
        //get the timestamp
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            heading : addData,
            createdAt : timestamp
        };
        todoRef
            .add(data)
            .then( ()=> {
                setAddData('');
                //release Keyboard
                Keyboard.dismiss();
            })
            .catch(error => { alert(error); })
    }
  }

  return (
    <View style={styles.HeaderView}> 
        <View style={styles.header}>
            <Text style={{fontSize:20,padding:20, fontWeight: 'bold' }}>My Tasks</Text>
        </View>
        <View style={styles.formContainer}>
            <TextInput
                style = {styles.input}
                placeholder = 'Add your task'
                placeholderTextColor= '#aaaaaa'
                onChangeText = { (heading) => setAddData(heading) } 
                value = {addData}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
            />
            <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style={styles.buttonText}> Add </Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data = {todos}
            numColumns = {1}
            renderItem = {({item}) => (
                <View>
                    <Pressable
                        style = {styles.container}
                        onPress = {()=>navigation.navigate('Details',{item})}
                    >
                        <FontAwesome
                            name = 'trash-o'
                            color = 'red'
                            onPress = {()=>deleteTodo(item)}
                            style = {styles.todoIcon}
                        />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase() + item.heading.slice(1)}
                            </Text>
                        </View>

                    </Pressable>
                </View>

            )}
        />
    </View>
  )

}

export default Home


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',//#e5e5e5
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45
    },
    HeaderView:{
        flex:1, 
        backgroundColor: '#40e0d0', // #98fb98 , #00ffff , #00bfff , #40e0d0
    },
    header:{
        marginTop: 50,
        backgroundColor:'transparent',//#E91E63,
        alignItems:'center',
        justifyContent: 'center',
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22
    },
    formContainer:{
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15
    },
    input:{
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button:{
        height: 47,
        borderRadius: 5,
        backgroundColor: '#ff4500', //  #788eec  #ff0000  #dc143c #ff69b4 
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    todoIcon:{
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14
    }
})

