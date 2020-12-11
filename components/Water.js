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
import { RegisterStyle } from "./style/Register_Style";
import { host_path, HeaderWithVeification } from "./header_types";

/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function ExtraInfo({ navigation }) {
    const [quant, setQuant] = useState(null);
    async function fetchData() {
        const response = await Retrieve();
        console.log("Amount:", response);
        setQuant(response);
    }

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require("./style/water.png")}
        >
            <Text
                onLayout={() => {
                    fetchData();
                    //Retrieve();
                }}
                style={styles.title}
            >
                {quant} ml
            </Text>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button
                        title="100ml"
                        style={styles.button}
                        color={"red"}
                        onPress={() => {
                            waterSubmitForm(100);
                            setQuant(quant + 100);
                            addHealth(1)
                        }}
                    />
                    <Button
                        title="500ml"
                        style={styles.button}
                        color={"red"}
                        onPress={() => {
                            waterSubmitForm(500);
                            setQuant(quant + 500);
                            addHealth(5)
                        }}
                    />
                    <Button
                        title="1000ml"
                        style={styles.button}
                        color={"red"}
                        onPress={() => {
                            waterSubmitForm(1000);
                            setQuant(quant + 1000);
                            addHealth(10)
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "20%",
        alignItems: "flex-end",
        alignContent: "flex-end",
        justifyContent: "space-around",
        flexDirection: "row",
    },

    button: { backgroundColor: "white", flexDirection: "row" },

    title: {
        marginTop: "40%",

        color: "white",
        textAlign: "center",
        alignSelf: "center",
        fontSize: 30,
    },
});

/* -------------------------------------------------------------------------- */
/*                              Fetching Backend                              */
/* -------------------------------------------------------------------------- */

async function waterSubmitForm(quantity) {
    //console.log("type", typeof token);
    //token = await getData();

    //const properToken = token.encode("UTF-8");
    try {
        const response = await fetch(host_path + "/api/water/findAdd", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({
                quantity: quantity,
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
        const response = await fetch(host_path + "/api/water/find", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({}),
        });

        const r = await response.json().then((object) => {
            return object.quantity;
        });

        return r;

        /*
        if (response.status == 200) {
            console.log(response);
            return response;
        } else {
            console.log(response.text());
            console.log("Failed");
        }
        */
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