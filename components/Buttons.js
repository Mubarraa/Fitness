import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Animated
} from 'react-native'
import { Slider } from "@miblanchard/react-native-slider";
import { MaterialIcons } from '@expo/vector-icons';
import { 
    getObject, 
    getObjectAchievement,
    patchAchievement 
} from '../fetch/generalFetch'

// button style
const ButtonStyle = StyleSheet.create({
    container : {
        padding: 10,
        margin: 10
    },
});

// profile style
const ProfileButtonStyle = StyleSheet.create({
    container : {
        padding: 10
    },
});

// slider style
const sliderStyle = StyleSheet.create({
    container: {
        padding: 10,
        margin: 20
    }
})

// banner style (red banner for removed objects)
const bannerStyle = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'red',
        alignSelf: 'stretch'
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10
    }
})

// custom button:
const CustomButton = ({button}) => {
    // if 'deleted' flag set then return nothing
    if (button.deleted) {
        return (<View></View>)
    }
    // else, return a button given color, function, text
    return (
        <View 
            style={ButtonStyle.container} 
            backgroundColor={button.color}
        >
            <TouchableOpacity
                onPress={() => {button.onpress()}}
            >
                <Text>{button.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

// custom slider container
function CustomSliderContainer(slider) {
    let deleted = false
    let mini = false
    let type = ""
    try {
        deleted = slider.deleted
        mini = slider.mini
        // if deleted flag set, return nothing
        if (deleted) {
            return (<View></View>)
        }
        // if mini flag set, return only the slider
        if (mini === true) {
            return (<CustomSlider slider={slider}/>)
        } else {
            // return the full container
            return (
                <View>
                    <Text style={slider.styling.text}>
                        How well did you complete this {type.toLowerCase()} today? 
                    </Text>
                    <CustomSlider slider={slider}/>
                </View>
            )
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

// slider with component
function CustomSlider({slider}) {
    const [num, setNum] = useState(0)
    let url = ""
    let color = "red"
    let disable = false
    try {
        // if disable flag set, disable the users ability to change
        // the value of the slider
        disable = slider.disable
        url = slider.url
        color = slider.styling.theme.color
        useEffect(() => {
            // get how well the user has completed the goal/habit
            // and set to slider
            async function getObjectCompletion(url) {
                const completion = await getObjectAchievement(url+"/lastAchievement")
                setNum(Math.round(completion*100))
            }
            getObjectCompletion(url)
        }, [])
    } catch (error) {
        console.log(error)
        return null
    }
    return (
        <Animated.View>
            <Text style={slider.styling.text}>
                Current: {num}%
            </Text>
            <Slider 
                style={sliderStyle.container}
                value={num}
                disabled={disable}
                onValueChange={num => setNum(Math.round(num))}
                onSlidingComplete={(num) => {
                    // patch achievement
                    patchAchievement(url, true, Math.round(num))
                    setNum(Math.round(num))
                }}
                // going to put in % :.
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={color}
                maximumTrackTintColor={color}
                thumbTintColor={color}
            />
        </Animated.View>
    )
}

// banner for deleted habit/goal/achievement
function DeletedBanner({deleted}) {
    if (deleted) {
        return (
            <View style={bannerStyle.container}>
                <Text style={bannerStyle.text}>
                    You have moved on from this!
                </Text>
            </View>
        )
    }
    return (<View></View>)
}

function CustomProfileButton() {
    return (
        <MaterialIcons 
            name='dehaze' 
            size={40} 
            style={ProfileButtonStyle.container}
            // go to profile page
            onPress={()=>goToProfilePage()}
        />
    )
}

export { 
    CustomButton, 
    CustomSliderContainer , 
    DeletedBanner, 
    CustomProfileButton
};