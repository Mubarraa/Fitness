import React, { useState, useEffect } from 'react'
import { 
    View, 
    FlatList, 
    Text,
    ScrollView
} from 'react-native'
import Header from '../components/Header'
import { AchieveListItem } from '../components/ListItem'
import { getObject } from '../fetch/generalFetch'
import HabitsStyle from '../styles/habitsStyle'
import { CustomButton } from '../components/Buttons'
import { host_path } from '../components/header_types'
import { useFocusEffect } from '@react-navigation/native'

// parameters for habits page button
const previousHabitButton = (buttonText, showHabits) => {
    return({
        text: buttonText,
        color: HabitsStyle.theme.color,
        onpress: showHabits
    })
}

//  parameters for new habit page button
const addHabitButton = (onpress) => {
    return({
        text: "Add my personalised habit",
        color: HabitsStyle.theme.color,
        onpress: onpress
    })
}


// view all habits (Habits page)
const HabitsScreen = ({routes, navigation}) => {
    const habitsUrl = host_path + "/api/habits"
    const [habits, setHabits] = useState(null)
    const textOptions = ["Habits You Are Tracking:", "Previous Habits: "]
    const [text, setText] = useState(textOptions[0])
    const buttonTextOptions = ["View previous habits", "View current habits"]
    const [buttonText, setButtonText] = useState(buttonTextOptions[0])
    const [current, setCurrent] = useState(true)
    // show habits page
    const showHabits = () => {
        // show previous/current habits
        setCurrent(!current)
        if (current) {
            setText(textOptions[0])
            setButtonText(buttonTextOptions[0])

        } else {
            setText(textOptions[1])
            setButtonText(buttonTextOptions[1])
        }
        // get habits given deleted flag
        async function getHabits(url, deleted) {
            let getUrl = url
            // if want deleted habits, fetch a different url
            if (deleted === false) {
                getUrl = getUrl + "/removed"
            }
            const habits = await getObject(getUrl, current)
            setHabits(habits)
        }
        getHabits(habitsUrl, current)
    }
    // got to new habit form upon press
    const addHabitPress = () => {
        navigation.navigate("NewHabitForm", {url:habitsUrl})
    }
    try {
        // get habits
        async function getHabits(habitsUrl, current) {
            const habits = await getObject(habitsUrl, current)
            setHabits(habits)
        }
        useEffect(() => {
            getHabits(habitsUrl, current)
        }, [])
        useFocusEffect(
            React.useCallback(() => {
                // to refresh everytime the page is 'refreshed'
                setHabits([])
                setCurrent(true)
                setText(textOptions[0])
                setButtonText(buttonTextOptions[0])
                getHabits(habitsUrl, current)
            }, []
        ))
    } catch (error) {
        console.log(error)
        return (
            <View style={HabitsStyle.container}>
                <View style={HabitsStyle.header}>
                    <Header title='Habits'/>
                </View>
            </View>
        )
    }
    // return habits screen template
    return (
        <View style={HabitsStyle.container}>
            <View style={HabitsStyle.horizontalAlign}>
                <CustomButton button={previousHabitButton(buttonText, showHabits)} />
                <CustomButton button={addHabitButton(addHabitPress)} />
            </View>
            <ScrollView style={HabitsStyle.bodyContainer}>
                <Text style={HabitsStyle.text}>
                    {text}
                </Text>
                <FlatList
                    style={{alignSelf:'stretch'}}
                    data={habits}
                    renderItem={({item}) => 
                    <AchieveListItem 
                        item={item} 
                        url={habitsUrl} 
                        styling={HabitsStyle}
                        navigation={navigation}
                        itemType={"Habit"}
                    />}
                />
            </ScrollView>
        </View>
    );
}

export default HabitsScreen;
