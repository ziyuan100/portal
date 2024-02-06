import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: 300,
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "#fff",
        color: "#fff",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginVertical: 4,
        backgroundColor: '#b02b27',
        color: "#fff",
        marginTop: 10,
        width: 300
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40
    },
})

export default styles