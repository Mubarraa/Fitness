/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

import { Text, View, TextInput, Button, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { RegisterStyle } from "./style/Register_Style";
import { host_path, HeaderWithOutVeification } from "./header_types";

/* -------------------------------------------------------------------------- */
/*                              Validation Schema                             */
/* -------------------------------------------------------------------------- */

const reviewSchema = yup.object({
    Username: yup.string().min(6).required(),
    Email: yup.string().min(6).required().email(),
    Password: yup.string().min(6).required(),
});

/* -------------------------------------------------------------------------- */
/*                               Render function                              */
/* -------------------------------------------------------------------------- */

export default function Register({ navigation }) {
    const [error, SetError] = useState("");

    return (
        <ImageBackground
            style={RegisterStyle.container}
            source={require("./style/flower.jpg")}
        >
            <View style={RegisterStyle.container}>
                <Formik
                    initialValues={{ Username: "", Email: "", Password: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={async (values) => {
                        //console.log(values.name);

                        const a = await submitForm(
                            values.Username,
                            values.Email,
                            values.Password
                        );

                        if (a == "Email already exists") {
                            console.log(a);
                            try {
                                SetError(a);
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            console.log("Success");
                            try {
                                SetError("Success!");
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }}
                >
                    {(props) => (
                        <View>
                            <TextInput
                                style={RegisterStyle.FormInputStyle}
                                autoCorrect={false}
                                placeholder="User name"
                                onChangeText={props.handleChange("Username")}
                                value={props.values.Username}
                            />
                            <Text>{props.errors.Username}</Text>
                            <View style={RegisterStyle.Inbetween}></View>
                            <TextInput
                                style={RegisterStyle.FormInputStyle}
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholder="Email"
                                onChangeText={props.handleChange("Email")}
                                value={props.values.Email}
                            />
                            <Text>{props.errors.Email}</Text>
                            <View style={RegisterStyle.Inbetween}></View>
                            <TextInput
                                style={RegisterStyle.FormInputStyle}
                                autoCorrect={false}
                                placeholder="Password"
                                onChangeText={props.handleChange("Password")}
                                value={props.values.Password}
                                secureTextEntry
                            />
                            <Text>{props.errors.Password}</Text>
                            <View style={RegisterStyle.Inbetween}></View>

                            <Button
                                title="Submit"
                                onPress={props.handleSubmit}
                            />
                            <Button
                                title="Login"
                                onPress={() => navigation.navigate("Login")}
                            />
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
                    )}
                </Formik>
            </View>
        </ImageBackground>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Fetching Backend                              */
/* -------------------------------------------------------------------------- */

async function submitForm(name, email, password) {
    //console.log("Button pressed");

    try {
        const response = await fetch(host_path + "/api/user/register", {
            method: "POST",
            headers: HeaderWithOutVeification,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });
        if (response.status == 200) {
            console.log("Registerd");
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
