/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import {
    Animated,
    Text,
    View,
    TextInput,
    Button,
    ImageBackground,
    AsyncStorage,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "./Elements/Header";
import { RegisterStyle } from "./style/Register_Style";
import { host_path, HeaderWithVeification } from "./header_types";

/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function Strength({ navigation }) {
    const [strength, setStrength] = useState(null);
    async function fetchData() {
        const response = await Retrieve();
        console.log("Strength:", response);
        setStrength(response);
    }

    return (
        <View style={{ flex: 2 }}>
            <Header title="Strength" color="#F2994A" />

            <Text
                onLayout={() => {
                    fetchData();
                }}
                //style={styles.title} 
                //title = {strength} 
            >
                 15 minutes
            </Text>
            <View style={styles.container}>
                <Button
                    title="Back"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title="5 min"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => {
                        submitForm(5);
                        setStrength(strength + 5);
                        addHealth(5)
                    }}
                />
                <Button
                    title="-5 min"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => {
                        submitForm(-5);
                        setStrength(strength -5);
                        addHealth(-5)
                    }}
                />
                <Button
                    title="10 min"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => {
                        submitForm(10);
                        setStrength(strength + 10);
                        addHealth(10)
                    }}
                />
                <Button
                    title="- 10 min"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => {
                        submitForm(-10);
                        setStrength(strength - 10);
                        addHealth(-10)
                    }}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: "center",
        alignContent: "stretch",
        justifyContent: "space-between",
        flexDirection: "column",
        marginBottom: 100,
    },

    button: {

        height: 10,
        width: 10,
        marginVertical: 40,
    },

    title: {
        marginTop: "40%",
        color: "black",
        textAlign: "center",
        alignSelf: "center",
        fontSize: 30,
    },
    rectangle: {
        width: "30%",
        height: 30,
        right: "5%",
        top: "2%",
        backgroundColor: "#F2994A",
    },
});

/* -------------------------------------------------------------------------- */
/*                              Fetching Backend                              */
/* -------------------------------------------------------------------------- */

async function submitForm(strength) {
    //console.log("type", typeof token);
    //token = await getData();

    //const properToken = token.encode("UTF-8");
    try {
        const response = await fetch(host_path + "/api/exercise/strength", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({
                totalMin: strength,
            }),
        });

        console.log(response.status);

        if (response.status == 200) {
            const j = await response.text();

            return j;
        } else {
            const j = await response.text();
        }
    } catch (error) {
        console.log(error);
    }
}

async function Retrieve() {
    try {
        const response = await fetch(host_path + "/api/exercise/find", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({}),
        });

        const r = await response.json().then((object) => {
            return object.strength;
        });

        return r;

    } catch (error) {
        console.log("Error: ", error);
    }
}


async function RetrieveHealth() {
    try {
        const response = await fetch(host_path + "/api/home/emotion", {
            method: "GET",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({}),
        });

        const r = await response.json().then((object) => {
            return object.health;
        });

        return r;
    } catch (error) {
        console.log("Error: ", error);
    }
}


async function addHealth(amt) {
    //console.log("type", typeof token);
    //token = await getData();

    //const properToken = token.encode("UTF-8");
    try {
        const response = await fetch(host_path + "/api/home/health", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({
                health: RetrieveHealth() + amt,
            }),
        });

        console.log(response.status);

        if (response.status == 200) {
            const j = await response.text();

            return j;
        } else {
            const j = await response.text();
        }
    } catch (error) {
        console.log(error);
    }
}