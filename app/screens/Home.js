import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';

const Home = ({ navigation }) => {
  return (
    <View>
        <Pressable onPress={() => navigation.navigate("Profile")} style={styles.button}><Text>Profile</Text></Pressable>
        <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.button}><Text>Logout</Text></Pressable>
    </View>
  )
}

export default Home


const styles = StyleSheet.create({
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