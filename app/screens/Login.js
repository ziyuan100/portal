import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable, Image } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const { colors } = useTheme();

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

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            <View style={{ width: 300, marginBottom: 10}}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25 }}>Sign in</Text>
                <Text style={{ color: "#fff" }}>Welcome to Coalesce</Text>
            </View>
            <View>
                <TextInput value={email} style={styles.input} placeholder='Email' placeholderTextColor="#fff" autoCapitalize='none' onChangeText={text => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' placeholderTextColor="#fff" autoCapitalize='none' onChangeText={text => setPassword(text)}></TextInput>
                { loading ? 
                    <ActivityIndicator size="large" color="#b02b27" /> :  
                    <Pressable onPress={signIn} style={styles.button}><Text style={{color: "#fff"}} >Log In</Text></Pressable>
                }
            </View>
            <Pressable onPress={() => navigation.navigate("Register", {styles})} style={{marginTop: 40}}><Text style={{color: '#f00'}}>Sign Up</Text></Pressable>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: 300,
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "#fff",
        color: "#fff",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginVertical: 4,
        backgroundColor: '#b02b27',
        color: "#fff",
        marginTop: 10,
        width: 300
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40
    },
})