import { View, Text, Button, FlatList, RefreshControl } from "react-native"
import Modal from "react-native-modal";
import innerStyles from "../styles/InnerStyles";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Listing from "../components/Listing";
import Activity from "../components/Activity";
import { getAuth } from "firebase/auth";

const Applications = () => {
    const [activities, setActivities] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [focusActivity, setFocusActivity] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getApplications();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getApplications();
        setRefreshing(false);
    })

    const getApplications = async () => {
        console.log("applications reload test");
        try {
            const user = getAuth().currentUser.uid;
            const userRef = doc(FIRESTORE_DB, "users", user);
            const docSnap = await getDoc(userRef);
            const applications = docSnap.data().applications;
            // where in requires a non-empty array... frustrating
            // const q = query(collection(FIRESTORE_DB, "activities"), where("id", "in", applications));
            // const querySnapshot = await getDocs(q);

            const activityRefs = applications.map(id => doc(FIRESTORE_DB, "activities", id));
            let acts = await Promise.all(activityRefs.map(ref => getDoc(ref)));
            acts = acts.map(doc => doc.data());
            setActivities(acts);
        } catch (e) {
            console.error(e);
        }
        
    }

    const focus = (activity) => {
        toggleModalVisibility();
        setFocusActivity(activity);
    }

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    }

    const renderItem = ({ item, index }) => (
        <Listing activity={item} key={index} focus={() => focus(item)}/>
    )

    return (
        
        <View>
            <FlatList 
                data={activities} 
                renderItem={renderItem} 
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />} 
                style={{minHeight: 200}}
            />
            <Modal 
                isVisible={modalVisibility} 
                coverScreen={true} 
                onBackButtonPress={toggleModalVisibility} 
                onSwipeComplete={toggleModalVisibility} 
                swipeDirection="down"
                style={{margin: 0}}
            >
                <Activity activity={focusActivity} reload={() => getApplications()}/>
            </Modal>
        </View>
        
    )
}

export default Applications;