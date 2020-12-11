import React, { Component } from "react";
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from "react-native";
import { host_path, HeaderWithVeification } from "./header_types";

import libmoji from "libmoji";

import Header from "./Elements/Header";

import HealthBar from "./Elements/HealthBar";

function Item({ id, title, selected, navigation }) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" },
            ]}
            onPress={() => navigation.navigate(title)}
        >
            <Text
                style={styles.title}
                onPress={() => navigation.navigate(title)}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const data = [
    {
        id: "1",
        title: "Goals",
    },
    {
        id: "4",
        title: "Achievements",
    },
    {
        id: "2",
        title: "Food",
    },
    {
        id: "5",
        title: "Exercise",
    },
    {
        id: "3",
        title: "Water",
    },
    {
        id: "6",
        title: "Habits",
    },
];

export default function App({ navigation }) {
    let comicId = libmoji.getComicId(libmoji.randTemplate(libmoji.templates));
    let avatarId = "270452363_2-s1";
    let health = RetrieveHealth();
    let emotion = RetrieveEmotion();
    console.log(health,emotion);

    let Image_Http_URL = {
        uri: libmoji.buildCpanelUrl(comicId, avatarId, 1, 2),
    };

    return (
        <View style={{ flex: 2 }}>
            <Header title="Home" color="#EB6F9B" />
            <View style={styles.rectangle}>
                <Text style={styles.font}>Health</Text>
            </View>

            <View style={styles.health}>
                <HealthBar hp = {health}></HealthBar>
            </View>

            <View
                style={{ alignItems: "center", height: "50%", width: "100%" }}
            >
                <Image
                    source={Image_Http_URL}
                    style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "cover",
                        alignContent: "center",
                    }}
                />
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView></ScrollView>
                <View>
                    <FlatList
                        numColumns={2}
                        data={data}
                        renderItem={({ item }) => (
                            <Item
                                id={item.id}
                                title={item.title}
                                navigation={navigation}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 40,
    },
    item: {
        width: "50%",
        padding: 10,
    },
    border: {
        height: "10%",
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 36,
    },
    button: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 2,
        margin: 10,
    },
    gButton: {
        flex: 1,
        height: 40,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: "grey",
    },
    font: {
        fontSize: 20,
        color: "white",
        paddingLeft: "20%",
    },
    rectangle: {
        width: "30%",
        height: 30,
        left: "5%",
        top: "2%",
        backgroundColor: "black",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    health: {
        alignItems: "flex-end",
        justifyContent: "center",
        right: "5%",
        top: -17,
        overflow: "hidden",
    },
});



async function RetrieveEmotion() {
    try {
        const response = await fetch(host_path + "/api/home/emotion", {
            method: "GET",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({}),
        });

        const r = await response.json().then((object) => {
            return object.emotion;
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

