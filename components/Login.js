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
import React, { useState } from "react";
import { RegisterStyle } from "./style/Register_Style";
import { Formik } from "formik";
import * as yup from "yup";
import { host_path, HeaderWithOutVeification } from "./header_types";

/* -------------------------------------------------------------------------- */
/*                              Validation Schema                             */
/* -------------------------------------------------------------------------- */

const reviewSchema = yup.object({
    Email: yup.string().min(6).required().email(),
    Password: yup.string().min(6).required(),
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
                secureTextEntry={Actualprops.typePassword}
            />
            <Text>{Actualprops.ErrorValue}</Text>
            <View style={RegisterStyle.Inbetween}></View>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function Login({ navigation }) {
    const [error, SetError] = useState("");

    return (
        <ImageBackground
            style={RegisterStyle.container}
            source={require("./style/flower.jpg")}
        >
            <View style={RegisterStyle.container}>
                <Formik
                    initialValues={{ Email: "", Password: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={async (values) => {
                        const a = await submitForm(
                            values.Email,
                            values.Password
                        );
                        if (a == "Password wrong") {
                            //console.log("Incorrect Password");
                            try {
                                SetError("Incorrect password or email.");
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            saveToLocal("@Storage_Key", a);
                            try {
                                SetError("");
                            } catch (error) {
                                console.log(error);
                            }
                            getData("@Storage_Key");
                            navigation.navigate("Extra Info");
                        }
                    }}
                >
                    {(props) => (
                        <View>
                            <RepeatedForm
                                props={props}
                                placeholder="Email"
                                handleChange="Email"
                                NameValue={props.values.Email}
                                ErrorValue={props.errors.Email}
                                typePassword={false}
                            />

                            <RepeatedForm
                                props={props}
                                placeholder="Password"
                                handleChange="Password"
                                NameValue={props.values.Password}
                                ErrorValue={props.errors.Password}
                                typePassword={true}
                            />

                            <Button
                                title="Submit"
                                onPress={props.handleSubmit}
                            />
                            <Button
                                title="Register"
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                    )}
                </Formik>

                <View>
                    <Text
                        style={{
                            color: "red",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Fetching Backend                              */
/* -------------------------------------------------------------------------- */

async function submitForm(email, password) {
    try {
        const response = await fetch(host_path + "/api/user/login", {
            method: "POST",
            headers: HeaderWithOutVeification,

            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.status == 200) {
            const j = await response.text();
            return j;
        } else {
            const j = await response.text();
            return j;
        }
    } catch (error) {
        console.log(error);
    }
}

/* -------------------------------------------------------------------------- */
/*                         Saving JWT to local storage function               */
/* -------------------------------------------------------------------------- */

async function saveToLocal(key, val) {
    try {
        await AsyncStorage.setItem("@Storage_Key", JSON.stringify(val));
    } catch (e) {
        console.log("myError: ", e);
    }
}

async function getData(key) {
    try {
        const value = await AsyncStorage.getItem("@Storage_Key");
        if (value !== null) {
            console.log("Here: ", value);
        }
    } catch (e) {
        console.log("myError: ", e);
    }
}
