import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log(res);
        } catch (err) {
            console.log(err);
            alert("Sign In Failed: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
        } catch (err) {
            console.log(err);
            alert("Sign Up Failed: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={text => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={text => setPassword(text)}></TextInput>
        
            { loading ? 
            <ActivityIndicator size="large" color="#0000ff" /> : 
            <> 
                <Pressable onPress={signIn} style={styles.button}><Text>Log In</Text></Pressable>
                <Pressable onPress={signUp} style={styles.button}><Text>Sign Up</Text></Pressable>
            </>}
        </View>
    )
}

export default Login;

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