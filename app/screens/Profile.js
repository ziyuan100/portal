import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import innerStyles from '../styles/InnerStyles';
import { getAuth, updateProfile } from 'firebase/auth';

const Profile = () => {
  const  [profileData, setProfileData] = useState({displayName: "", preferences: []})

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid; 

  const getUser = async () => {
    try {
      const res = await getDoc(doc(FIRESTORE_DB, "users", uid));
      if (res.exists()) {
        const data = res.data();
        // console.log(data);
        setProfileData({displayName: data.displayName, preferences: [...data.preferences]});
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUser();
  }, [])


  return (
    <View style={{flex: 1 }}>
      <View style={{alignItems: "center"}}>
        <Image source={require("../../assets/user.png")} style={{width: 100, height: 100, margin: 20}}/>
        <View>
          <Text style={{color: "#fff", fontWeight: "bold", fontSize: 20, margin: 20}}>Name: {user.displayName}</Text>
          <Text style={{color: "#fff", fontWeight: "bold", fontSize: 20, margin: 20}}>Email: {user.email}</Text>
        </View>
      </View>
      <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={{...innerStyles.button, marginTop: "auto", backgroundColor: "red"}}>
        <Text style={{fontWeight: "bold", color: "#fff"}}>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Profile