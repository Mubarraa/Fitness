
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ObjectInfo } from '../components/Object'
import HabitsStyle from '../styles/habitsStyle'
import { getObject } from '../fetch/generalFetch'
import { useFocusEffect } from '@react-navigation/native'
import { deleteObject, patch } from '../fetch/generalFetch'
import { CustomButton } from '../components/Buttons'
import Space from '../components/Space'

// parameters for custom remove button
function removeButton( url, deleted, onpress) {
    url = url + "/remove"
    return({
        text: 'Move On From This Habit',
        color: HabitsStyle.theme.color,
        onpress: onpress,
        deleted: deleted
    })
}

// parameters for custom delete habit button
function deleteButton(onpress) {
    return({
        text: 'Delete',
        color: HabitsStyle.theme.color,
        onpress: onpress
    })
}

// parameters for custom back button
function backButton(onpress) {
    return({
        text: 'Back',
        color: HabitsStyle.theme.color,
        onpress: onpress
    })
}

// parameters for custom progress button
function progressButton(style) {
    return({
        text: 'View Progress',
        color: HabitsStyle.theme.color
    })
}

// view specific habits
const HabitScreen = ({route, navigation}) => {
    const { url } = route.params
    const [habit, setHabit] = useState(null)
    const [deleted, setDeleted] = useState(false)
    // go back to habits page upon deleting current habit
    const deletePress = () => {
        deleteObject(url)
        navigation.navigate('Habits')
    }
    // go back to habits page upon pressing back button
    const backPress = () => {
        navigation.navigate('Habits')
    }
    // show deleted banner upon moving on from habit
    const removePress = async () => {
        const updatedHabit = await patch(url+"/remove", true)
        setDeleted(true)
        setHabit(updatedHabit)
    }
    try {
        // get habit details
        async function getHabit() {
            const habit = await getObject(url)
            setHabit(habit)
            if (habit != null) {
                setDeleted(habit.deleted)
            }
        }
        useEffect(() => {
            getHabit()
        },[])
        useFocusEffect(
            React.useCallback(() => {
                getHabit()
            }, [])
        )
    } catch (error) {
        console.log(error)
    }
    // return template for habit page
    return (
        <View style={HabitsStyle.container}>
            <View style={HabitsStyle.horizontalAlign}>
                <CustomButton button={backButton(backPress)}/>
                <CustomButton button={progressButton()}/>
            </View>
            <ObjectInfo 
                object={habit}
                objectType={"Habit"}
                url={url} 
                navigation={navigation}
                styling={HabitsStyle}
            />
            <CustomButton button={removeButton(url, deleted, removePress)}/>
            <Space />
            <CustomButton button={deleteButton(deletePress)}/>
        </View>
    )
}



export default HabitScreen;
