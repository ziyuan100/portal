import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, getDocs, doc } from 'firebase/firestore';

const Register = ({ route }) => {
    const { styles } = route.params;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const res = await updateProfile(user, {
                displayName: name
            })
            // console.log(res);
            const document = await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
                displayName: user.displayName,
                email: user.email,
                preferences: [],
                enrollments: [],
                applications: []
            });
        } catch (err) {
            console.log(err);
            alert("Sign Up Failed: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: "auto", marginTop: 100 }}>
                <TextInput value={name} style={{...styles.input, marginBottom: 20}} placeholder='Name' placeholderTextColor="#fff" autoCapitalize='none' onChangeText={text => setName(text)}></TextInput>
                <TextInput value={email} style={{...styles.input, marginBottom: 20}} placeholder='Email' placeholderTextColor="#fff" autoCapitalize='none' onChangeText={text => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' placeholderTextColor="#fff" autoCapitalize='none' onChangeText={text => setPassword(text)}></TextInput>
            </View>  
            { loading ? 
                <ActivityIndicator size="large" color="#b02b27" /> : 
                <Pressable onPress={signUp} style={{...styles.button, marginBottom: 60}}><Text>Sign Up</Text></Pressable>
            }
        </View>
    )
}

export default Register;