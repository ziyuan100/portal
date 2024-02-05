import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const Home = ({ navigation }) => {
    // Success! Adding to firestore works!!!
    const addTest = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, "users"), {
              first: "Alan",
              middle: "Mathison",
              last: "Turing",
              born: 1912
            });
          
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <View>
            <Pressable onPress={addTest} style={innerStyles.button}><Text>Test</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Profile")} style={innerStyles.button}><Text>Profile</Text></Pressable>
            <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={innerStyles.button}><Text>Logout</Text></Pressable>
        </View>
    )
}

export default Home


const innerStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: "center"
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginVertical: 4,
        backgroundColor: '#2196F3',
    }
})