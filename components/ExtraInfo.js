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
} from "react-native";
import React, { Component } from "react";
import { RegisterStyle } from "./style/Register_Style";
import { Formik } from "formik";
import * as yup from "yup";
import { host_path, HeaderWithVeification } from "./header_types";

/* -------------------------------------------------------------------------- */
/*                              Validation Schema                             */
/* -------------------------------------------------------------------------- */

const reviewSchema = yup.object({
    weight: yup.number().min(2).required().max(635),
    height: yup.number().min(57).required().max(261),
});

/* -------------------------------------------------------------------------- */
/*                           Input Format Component                           */
/* -------------------------------------------------------------------------- */

function RepeatedForm(Actualprops) {
    return (
        <View>
            <TextInput
                style={RegisterStyle.FormInputStyle}
                placeholder={Actualprops.placeholder}
                onChangeText={Actualprops.props.handleChange(
                    Actualprops.handleChange
                )}
                value={Actualprops.NameValue}
            />
            <Text>{Actualprops.ErrorValue}</Text>
            <View style={RegisterStyle.Inbetween}></View>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function ExtraInfo({ navigation }) {
    return (
        <ImageBackground
            style={RegisterStyle.container}
            source={require("./style/flower.jpg")}
        >
            <View style={RegisterStyle.container}>
                <Formik
                    initialValues={{ weight: "", height: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={async (values) => {
                        //console.log("The token", token);
                        const a = await WeightHeight(
                            values.weight,
                            values.height
                        );
                        navigation.navigate("Home");
                        //getData("@Storage_Key");
                    }}
                >
                    {(props) => (
                        <View>
                            <RepeatedForm
                                props={props}
                                placeholder="weight"
                                handleChange="weight"
                                NameValue={props.values.weight}
                                ErrorValue={props.errors.weight}
                            />

                            <RepeatedForm
                                props={props}
                                placeholder="height"
                                handleChange="height"
                                NameValue={props.values.height}
                                ErrorValue={props.errors.height}
                            />

                            <Button
                                title="Submit"
                                onPress={props.handleSubmit}
                            />
                            <Button
                                title="Back"
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </ImageBackground>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Fetching Backend                              */
/* -------------------------------------------------------------------------- */

async function WeightHeight(weight, height) {
    //console.log("type", typeof token);
    //token = await getData();

    //const properToken = token.encode("UTF-8");
    try {
        const response = await fetch(host_path + "/api/extraInfo/extra", {
            method: "POST",
            headers: await HeaderWithVeification(),
            body: JSON.stringify({
                weight: weight,
                height: height,
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
