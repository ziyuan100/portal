import { View, Text, Pressable, StyleSheet, useWindowDimensions, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Explore from './Explore';
import Application from "./Applications";
import Enrollment from './Enrollments';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import { Header } from 'react-native/Libraries/NewAppScreen';
import innerStyles from '../styles/InnerStyles';

// const renderScene = SceneMap({
//     first: Explore,
//     second: Application,
//     third: Enrollment
// })

const renderScene = ({route}) => {
    
    switch (route.key) {
        case "first":
            return <Explore />;
        case "second":
            return <Application />;
        case "third":
            return <Enrollment />;
    }
}

const Home = ({ navigation }) => {
    // tabbar state
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: "first", title: "Explore"},
        {key: "second", title: "Applications"},
        {key: "third", title: "Enrollments"}
    ]);
    const [username, setUsername] = useState("User");

    useEffect(() => {
        const user = getAuth().currentUser;
        if (user !== null) {
            setUsername(user.displayName);
        }
    }, [])

    const renderLabel = ({route}) => (
        <Text style={{fontSize: 12, color: "lightgrey"}}>{route.title}</Text>
    )

    const renderTabBar = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#fff' }}
                style={{ backgroundColor: innerStyles.header.backgroundColor }}
                renderLabel={renderLabel}
            />
        )
    }

    return (
        <View style={innerStyles.container}>
            <View style={innerStyles.header}>
                <Text style={{color:"#fff", fontSize: 20 }}>Hello, {username}!</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image style={innerStyles.profileImg} source={require('../../assets/user.png')}/>
                </TouchableOpacity>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy={({route}) => true}
            />
        </View>
    );
}

export default Home;