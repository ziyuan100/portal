import { View, Text, Button, FlatList, RefreshControl } from "react-native"
import Modal from "react-native-modal";
import innerStyles from "../styles/InnerStyles";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Listing from "../components/Listing";
import Activity from "../components/Activity";
import { getAuth } from "firebase/auth";
import Timeline from "react-native-timeline-flatlist";

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    // const [modalVisibility, setModalVisibility] = useState(false);
    // const [focusActivity, setFocusActivity] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getEnrollments();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getEnrollments();
        setRefreshing(false);
    })

    const getEnrollments = async () => {
        // console.log("enrollments reload test");
        try {
            const user = getAuth().currentUser.uid;
            const userRef = doc(FIRESTORE_DB, "users", user);
            const docSnap = await getDoc(userRef);
            const enrollments = docSnap.data().enrollments;
            const enrollmentRefs = enrollments.map(id => doc(FIRESTORE_DB, "activities", id));
            // scuffed formatting... too bad
            let acts = await Promise.all(enrollmentRefs.map(ref => getDoc(ref)));
            acts = acts.map(doc => doc.data());
            acts = acts.map(obj => ({time: obj.date[0].toDate().toDateString().split(' ').slice(1).join(' '), title: obj.name, description: obj.location}))
            setEnrollments(acts);
        } catch (e) {
            console.error(e);
        }
        
    }

    // const focus = (activity) => {
    //     toggleModalVisibility();
    //     setFocusActivity(activity);
    // }

    // const toggleModalVisibility = () => {
    //     setModalVisibility(!modalVisibility);
    // }

    // const renderItem = ({ item, index }) => (
    //     <Listing activity={item} key={index} focus={() => focus(item)}/>
    // )

    return (
        
        <View>
            <Timeline
                data={enrollments}
                circleColor="#fff"
                circleSize={20}
                lineColor="#fff"
                timeContainerStyle={{minWidth:60,}}
                timeStyle={{textAlign: 'center', backgroundColor:'#fff', color:'black', padding:5, borderRadius:10}}
                titleStyle={{color:"#fff"}}
                descriptionStyle={{color:'#fff'}}
                options={{
                    refreshControl: (<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />)
                }}
                isUsingFlatlist={true}
                style={{minHeight: 400, padding: 20}}
                showTime={true}
                eventContainerStyle={{paddingBottom: 20}}
            />
        </View>
    )
}

export default Enrollments;