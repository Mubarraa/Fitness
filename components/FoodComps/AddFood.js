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
import { Rating, AirbnbRating } from "react-native-elements";

/* -------------------------------------------------------------------------- */
/*                              Rating Component                              */
/* -------------------------------------------------------------------------- */
function RatingComp(prop) {
    return (
        <View>
            <Text style={{ alignSelf: "center", fontSize: 20 }}>
                {prop.question}
            </Text>

            <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "Meh", "Good", "Awesome"]}
                defaultRating={11}
                size={20}
                readonly
            />
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*                           Add food item and style                          */
/* -------------------------------------------------------------------------- */

export default function AddFood({ submitHandler }) {
    const [text, setText] = useState("");
    const [h, setH] = useState("");
    const [t, setT] = useState("");

    const changeHandler = (val) => {
        setText(val);
    };
    const changeHandlerH = (val) => {
        setH(val);
    };
    const changeHandlerT = (val) => {
        setT(val);
    };

    return (
        <View style={{ paddingTop: "10%" }}>
            <TextInput
                style={add.input}
                placeholder="Add your meal!"
                onChangeText={changeHandler}
            />
            <TextInput
                style={add.input}
                placeholder="From 1 to 5 how healthy was your meal"
                onChangeText={changeHandlerH}
                keyboardType="numeric"
            />
            <TextInput
                style={add.input}
                placeholder="From 1 to 5 how tasty was your meal"
                onChangeText={changeHandlerT}
                keyboardType="numeric"
            />

            {/* <RatingComp question="How healthy is your meal?" />
            <RatingComp question="How tasty is your meal?" />
            */}
            <Button
                onPress={() => {
                    const n = submitHandler(text, h, t);
                }}
                title="Set your meal!"
                color="white"
            />
        </View>
    );
}

const add = StyleSheet.create({
    container: {
        flex: 1,
    },

    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "coral",
        //marginTop: "20%",
        margin: "10%",
    },
});
