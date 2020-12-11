import { AsyncStorage } from "react-native";

const host_path = "http://localhost:5000";

const HeaderWithOutVeification = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const HeaderWithVeification = async () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": JSON.parse(await getData()),
    };
};

async function getData() {
    try {
        const value = await AsyncStorage.getItem("@Storage_Key");
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("myError: ", e);
    }
}
//HeaderWithVeification
export { host_path, HeaderWithOutVeification, HeaderWithVeification };
