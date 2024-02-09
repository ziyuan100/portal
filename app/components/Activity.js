import { getAuth } from "firebase/auth";
import { View, Text, Pressable, Image } from "react-native";
import Modal from "react-native-modal";
import Confirmation from "./Confirmation";
import { useState } from "react";

/*
Bug: currently after applying for the activity, hasApplied changes to true, but only the pressable when hasApplied is false disappears
pressable for when hasApplied is true does not load => FIX: separate the 2 component into their own conditionals. Lol why does this work and the original idea not
*/

const Activity = ({activity, reload}) => {
    // console.log("test");
    const dateArr = activity.date.map(timestamp => timestamp.toDate());
    const user = getAuth().currentUser.uid;

    const [confirmationVisibility, setConfirmationVisibility] = useState(false);
    const toggleConfirmationVisibility = () => {
        setConfirmationVisibility(!confirmationVisibility);
    }

    const [hasApplied, setHasApplied] = useState(activity.applications.includes(user));
    const reloadAgain = async () => {
        await reload();
        setHasApplied(true);
    }

    // oof this is a mess
    return (
        <View style={{height: "80%", marginTop:"auto", backgroundColor: "white", alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <Image source={require("../../assets/swipe.png")} style={{height: 40, width: 40}} />
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 150, marginHorizontal: 20, borderBottomWidth: 1}}>
                <View style={{height: 120, width: 200, flex: 1, justifyContent: "center"}}>
                    <Text style={{color: "#000", fontWeight: "bold", fontSize: 18, marginBottom: 2}}>{activity.name}</Text>
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                        <Image source={require("../../assets/pin.png")} style={{height: 14, width: 14}} />
                        <Text style={{color:"#000", fontSize: 14}} numberOfLines={1}>{activity.location}</Text>
                    </View>
                    {dateArr.map((date, idx) => (
                        <Text key={idx}>{date.toDateString()}</Text>
                    ))}
                    <Text style={{color:"#000", fontSize: 14}}></Text>
                </View>
                <View style={{height: 120, width: 120}}>
                    <Image source={require("../../assets/placeholder.png")} style={{height: 120, width: 120, borderRadius: 15}} />
                </View>
            </View>
            <View style={{height: "40%", marginHorizontal: 20, paddingTop: 10}}>
                <Text style={{fontWeight: "bold", fontSize: 14}}>Activity Description</Text>
                <Text style={{margin: 20}}>{activity.description}</Text>
            </View>
            
            {/* {hasApplied ?
                <Pressable 
                    style={{backgroundColor: "#252627", marginTop: "auto", marginBottom: 60, paddingHorizontal: 100, paddingVertical: 10, borderRadius: 10}}
                    disabled={true}
                >
                    <Text style={{fontWeight: "bold", color: "#fff"}}>Applied</Text>
                </Pressable>
                :
                <Pressable 
                    style={{backgroundColor: "red", marginTop: "auto", marginBottom: 60, paddingHorizontal: 100, paddingVertical: 10, borderRadius: 10}}
                    onPress={toggleConfirmationVisibility}
                    android_ripple={{color: "#b02b27"}}
                >
                    <Text style={{fontWeight: "bold", color: "#fff"}}>Apply</Text>
                </Pressable>
            } */}
            {hasApplied &&
                <Pressable 
                    style={{backgroundColor: "#252627", marginTop: "auto", marginBottom: 60, paddingHorizontal: 100, paddingVertical: 10, borderRadius: 10}}
                    disabled={true}
                >
                    <Text style={{fontWeight: "bold", color: "#fff"}}>Applied</Text>
                </Pressable>
            }
            
            {!hasApplied &&
                <Pressable 
                    style={{backgroundColor: "red", marginTop: "auto", marginBottom: 60, paddingHorizontal: 100, paddingVertical: 10, borderRadius: 10}}
                    onPress={toggleConfirmationVisibility}
                    android_ripple={{color: "#b02b27"}}
                >
                    <Text style={{fontWeight: "bold", color: "#fff"}}>Apply</Text>
                </Pressable>
            }

            <Modal 
                isVisible={confirmationVisibility} 
                coverScreen={true} 
                onBackButtonPress={toggleConfirmationVisibility} 
                style={{margin: 0, alignItems: "center"}}
            >
                <Confirmation activity={activity} reload={reloadAgain} close={toggleConfirmationVisibility}/>
            </Modal>
        </View>
    )
}

export default Activity;