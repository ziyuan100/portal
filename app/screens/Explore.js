import { View, Text, Button, FlatList, RefreshControl } from "react-native"
import Modal from "react-native-modal";
import innerStyles from "../styles/InnerStyles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Listing from "../components/Listing";
import Activity from "../components/Activity";
import { getAuth } from "firebase/auth";

const Explore = () => {
    const [activities, setActivities] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [focusActivity, setFocusActivity] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getActivities();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getActivities();
        setRefreshing(false);
    })

    const getActivities = async () => {
        
        try {
            // const user = getAuth().currentUser.uid;
            const q = query(collection(FIRESTORE_DB, "activities"), where("completed", "==", false));
            const querySnapshot = await getDocs(q);
            const acts = [];
            querySnapshot.forEach(doc => {
                acts.push({...doc.data(), id: doc.id});
            })
            // console.log("explore reload test", acts);
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
                <Activity activity={focusActivity} reload={getActivities}/>
            </Modal>
        </View>
        
    )
}

export default Explore;