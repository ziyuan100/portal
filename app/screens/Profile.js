import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import innerStyles from '../styles/InnerStyles';
import { getAuth, updateProfile } from 'firebase/auth';

const Profile = () => {
  const  [profileData, setProfileData] = useState({displayName: "", preferences: []})

  const auth = getAuth();
  const uid = auth.currentUser.uid; 

  const getUser = async () => {
    try {
      const res = await getDoc(doc(FIRESTORE_DB, "users", uid));
      if (res.exists()) {
        const data = res.data();
        console.log(data);
        setProfileData({displayName: data.displayName, preferences: [...data.preferences]});
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUser();
    // setProfileData({displayName: data.displayName, preferences: [...data.preferences]});
  }, [])

  const saveProfile = async() => {
    try {
      await updateDoc(doc(FIRESTORE_DB, "users", uid), profileData);
      const auth = getAuth();
      const user = auth.currentUser;
      updateProfile(user, {
        displayName: profileData.displayName
      });
      console.log("success");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View>
      <Text style={{color: "#fff"}}>Display Name</Text>
      <TextInput style={{color: "#fff"}} value={profileData.displayName} onChangeText={name => setProfileData(prevProfileData => ({...prevProfileData, displayName: name}))} />
      <Pressable onPress={saveProfile} style={innerStyles.button}><Text>Save Profile</Text></Pressable>
      <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={innerStyles.button}><Text>Logout</Text></Pressable>
    </View>
  )
}

export default Profile