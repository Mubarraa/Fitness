import React from 'react'
import {StyleSheet,Text,View, Animated, TouchableWithoutFeedback}from 'react-native';


export default class HealthBar extends React.Component{
    state = {
        animation: new Animated.Value(0)
    };

    handlePress = () => {
  
            this.state.animation.setValue(0);

        Animated.timing(this.state.animation,{
            toValue: this.props.hp,
            duration: 1500
        }).start();
    };

    componentDidMount(){
        this.handlePress();
    }
    render(){


        const progressInterpolate = 
        this.state.animation.interpolate({
            inputRange: [0,100],
            outputRange: ["0%", "100%"],
            extrapolate : "clamp"
        })

        const colorInterpolate = 
        this.state.animation.interpolate({
            inputRange: [0,1],
            outputRange: ["rgb(99,71,255)","rgb(71,255,99)"]
        })

        const progressStyle = {
            width: progressInterpolate,
            bottom: 0,
            backgroundColor: colorInterpolate

        }

        return (
            <View style = {styles.container}>
                <TouchableWithoutFeedback onPress=
                {this.handlePress}>
                    <View style = {styles.button}>
                        <View style = {StyleSheet.absoluteFill}>
                            <Animated.View style = {[styles.progress, progressStyle]}/>
                        </View>

                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }


}


const styles = StyleSheet.create({

    button: {
        backgroundColor: "#e6537d",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 65,
        paddingVertical: 17,
        overflow: "hidden"
    },
    buttonText:{
        color: "#FF0",
        fontSize: 24,
        backgroundColor: "transparent"     
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
        
    }
});