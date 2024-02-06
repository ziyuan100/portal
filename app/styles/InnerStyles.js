import { StyleSheet } from "react-native";

const innerStyles = StyleSheet.create({
    header: {
        height: 100,
        padding: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#252627"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginVertical: 4,
        backgroundColor: '#2196F3',
    },
    profileImg: {
        width: 50,
        height: 50
    }
})

export default innerStyles;