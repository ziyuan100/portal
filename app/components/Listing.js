import { TouchableOpacity, View, Text, Image } from "react-native"

const Listing = ({ activity, focus }) => {
    // console.log(activity);
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={focus}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", height: 150, marginHorizontal: 20, marginVertical: 10, borderRadius: 10, padding: 10}}>
                <View style={{height: 120, width: 200, flex: 1, justifyContent: "center"}}>
                    <Text style={{color: "#000", fontWeight: "bold", fontSize: 18, marginBottom: 2}}>{activity.name}</Text>
                    <Text style={{color: "#000", flex: 1}} numberOfLines={3}>{activity.description}</Text>
                    <View style={{flexDirection: "row", alignItems: "center", marginTop: "auto"}}>
                        <Image source={require("../../assets/pin.png")} style={{height: 14, width: 14}} />
                        <Text style={{color:"#000", fontSize: 12}} numberOfLines={1}>{activity.location}</Text>
                    </View>
                </View>
                <View style={{height: 120, width: 120}}>
                    <Image source={require("../../assets/placeholder.png")} style={{height: 120, width: 120, borderRadius: 15}} />
                </View>
            </View>
        </TouchableOpacity>
    )
    
}

export default Listing;