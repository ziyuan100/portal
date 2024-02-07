import { View, Text } from "react-native"
import innerStyles from "../styles/InnerStyles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";

const Explore = () => {
    const [activities, setActivities] = useState([]);

    const getActivities = async () => {
        try {
            const q = query(collection(FIRESTORE_DB, "activities"));
            const querySnapshot = await getDocs(q);
            const acts = [];
            querySnapshot.forEach(doc => {
                acts.push(doc.data());
            })
            setActivities(acts);
        } catch (e) {
            console.error(e);
        }
        
    }

    useEffect(() => {
        getActivities();
    }, [])

    return (
        <View style={{flex: 1}}>
            {activities.forEach(activity => {
                console.log("jsx", activity);
                return(
                    <Text style={{color:"#fff"}}>{activity.name}</Text>
                )  
            })}
        </View>
    )
}

export default Explore;