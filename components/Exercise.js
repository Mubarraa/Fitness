import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import {
    Text,
    View,
    TextInput,
    Button,
    ImageBackground,
    AsyncStorage,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { RegisterStyle } from "./style/Register_Style";
import Header from "./Elements/Header";
import { Formik } from "formik";
import * as yup from "yup";
import { host_path, HeaderWithOutVeification } from "./header_types";

/* -------------------------------------------------------------------------- */
/*                     Pages or Routes render componenets                     */
/* -------------------------------------------------------------------------- */

import Strength from "./Strength";
import Balance from "./Balance";
import Endurance from "./Endurance";
import Flexibility from "./Flexibility";


/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function Exercise({ navigation }) {
    const [total, setTotal] = useState(0);
    async function fetchData() {
        const response = await Retrieve();
        console.log("Exercise:", response);
        setTotal(response);
    }

    return (
        <View style={{ flex: 2 }}>
            <Header title="Exercise" color="#F2994A" />
     
           
            <Text
                onLayout={() => {
                    fetchData();
                }}
                //style= {style.title}
            >
                60 minutes
            </Text>
            <View style={styles.container}>
                {/* <Text title= {styles.title}
                        style= {styles.rectangle}
                    >  
                 </Text> */}
                <Button
                    title="Strength"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => navigation.navigate("Strength") }
                />
                <Button
                    title="Endurance"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => navigation.navigate('Endurance')
                    }
                />
                <Button
                    title="Balance"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => navigation.navigate('Balance')}
                />
                <Button
                    title="Flexibility"
                    style={styles.button}
                    color={"#F2994A"}
                    onPress={() => navigation.navigate('Flexibility')
                    }
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

async function Retrieve() {
    try {
        const response = await fetch(host_path + "/api/exercise/find", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({}),
        });

        const e = await response.json().then((object) => {
            return object.totalMin;
        });

        return e;
    } catch (error) {
        console.log("Error: ", error);
    }
}


