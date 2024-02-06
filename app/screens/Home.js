import { View, Text, Pressable, StyleSheet, useWindowDimensions, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Explore from './Explore';
import Enrollment from './Enrollment';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import { Header } from 'react-native/Libraries/NewAppScreen';
import innerStyles from '../styles/InnerStyles';

const renderScene = SceneMap({
    first: Explore,
    second: Enrollment,
})

const Home = ({ navigation }) => {
    // tabbar state
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: "first", title: "Explore"},
        {key: "second", title: "Enrollments"}
    ]);

    const renderTabBar = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#fff' }}
                style={{ backgroundColor: innerStyles.header.backgroundColor }}
            />
        )
    }

    const [username, setUsername] = useState("User");
    const auth = getAuth();
    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            setUsername(user.displayName);
        }
    }, [])

    return (
        <View style={innerStyles.container}>
            <View style={innerStyles.header}>
                <Text style={{color:"#fff", fontSize: 20 }}>Hello {username}!</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image style={innerStyles.profileImg} source={require('../../assets/user.png')}/>
                </TouchableOpacity>
                {/* <Pressable onPress={() => navigation.navigate("Profile")} style={innerStyles.button}><Text>Profile</Text></Pressable> */}
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                
            />
        </View>
    );
}

export default Home