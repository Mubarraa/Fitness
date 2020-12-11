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
    FlatList,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React, { useState, useEffect, Component } from "react";
import { host_path, HeaderWithVeification } from "./header_types";
import FoodItem from "./FoodComps/FoodItem";
import AddFood from "./FoodComps/AddFood";

/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function Food({ navigation }) {
    const [todos, setTodos] = useState([
        // { text: "buy coffee", healthy: "3", tasty: "3", key: "1" },
        // { text: "buy chocolate", healthy: "3", tasty: "3", key: "2" },
        // { text: "buy dude", healthy: "3", tasty: "3", key: "3" },
    ]);

    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.key != key);
        });
    };

    const submitHandler = (text, healthy, tasty) => {
        if (
            text.length > 3 &&
            parseInt(healthy) <= 5 &&
            parseInt(healthy) >= 1 &&
            parseInt(tasty) <= 5 &&
            parseInt(tasty) >= 1
        ) {
            setTodos((prevTodos) => {
                return [
                    {
                        text: text,
                        healthy: healthy,
                        tasty: tasty,
                        key: Math.random().toString(),
                    },
                    ...prevTodos,
                    addHealth(tasty + healthy)
                ];
            });

            FoodNameHealthy(text, healthy, tasty);
        } else {
            Alert.alert(
                "Oops",
                "It appears one of the fields entered is incorrect.",
                [
                    {
                        text: "ok",
                        onPress: () => console.log("alert closed"),
                    },
                ]
            );
            return 0;
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <ImageBackground
                style={{ flex: 1 }}
                source={require("./style/food.jpg")}
            >
                <View styles={styles.content}>
                    <View styles={styles.list}>
                        <AddFood submitHandler={submitHandler} />
                        <FlatList
                            data={todos}
                            renderItem={({ item }) => (
                                <FoodItem
                                    item={item}
                                    pressHandler={pressHandler}
                                />
                            )}
                            style={styles.list}
                        />
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

/* -------------------------------------------------------------------------- */
/*                             Backend submission                             */
/* -------------------------------------------------------------------------- */

async function FoodNameHealthy(name, healthy, tasty) {
    //console.log("type", typeof token);
    //token = await getData();

    //const properToken = token.encode("UTF-8");
    try {
        const response = await fetch(
            host_path + "/api/food/breakfest/modified",
            {
                method: "POST",
                headers: await HeaderWithVeification(),
                body: JSON.stringify({
                    name: name,
                    healthy: parseInt(healthy),
                    delicious: parseInt(tasty),
                }),
            }
        );

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

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "10%",
    },
    content: {
        marginTop: "20%",
        margin: "10%",
    },
    list: {
        marginTop: "2%",
        margin: "10%",
    },
});
