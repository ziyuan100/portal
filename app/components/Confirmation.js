import { View, Text, Image, Pressable } from "react-native"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { FIRESTORE_DB } from "../../firebaseConfig"

const Confirmation = ({activity, close, reload}) => {
    const apply = async () => {
        const activityRef = doc(FIRESTORE_DB, "activities", activity.id);
        const user = getAuth().currentUser.uid;
        await updateDoc(activityRef, {
            applications: arrayUnion(user)
        })
        const userRef = doc(FIRESTORE_DB, "users", user);
        await updateDoc(userRef, {
            applications: arrayUnion(activity.id)
        })
        await reload();
        close();
    }

    return (
        <View style={{height: "40%", width: "80%", backgroundColor: "white", alignItems: "center", borderRadius: 20}}>
            <Pressable onPress={close} style={{ position: "absolute", right: 10, top: 10}}>
                <Image source={require("../../assets/close.png")} style={{ width: 20, height: 20 }} />
            </Pressable>
            <Text style={{fontWeight: "bold", marginTop: 20, marginRight: 20}}>Are you sure that you would like to apply for the following event:</Text>
            <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 30}}>{activity.name}</Text>
            <Text>{activity.location}</Text>
            <Pressable onPress={apply} style={{backgroundColor: "red", marginTop: "auto", marginBottom: 40, paddingHorizontal: 100, paddingVertical: 10, borderRadius: 10}}>
                <Text style={{color: "#fff"}}>Apply</Text>
            </Pressable>
        </View>
    )
}

export default Confirmation