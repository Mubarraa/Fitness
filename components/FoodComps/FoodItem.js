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
/*                             Food Item and style                            */
/* -------------------------------------------------------------------------- */

export default function FoodItem({ item, pressHandler }) {
    return (
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text
                style={itemStyle.item}
            >{`M: ${item.text} H: ${item.healthy} T: ${item.tasty}`}</Text>
        </TouchableOpacity>
    );
}

const itemStyle = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderBottomColor: "#bbb",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
    },
});
