
import React, { useState, useEffect } from 'react'
//import { View } from 'react-native'
import { View, Text, FlatList } from 'react-native'
import { GoalInfo } from '../components/Object'
import GoalsStyle from '../styles/goalsStyle'
import { getObject } from '../fetch/generalFetch'
import { useFocusEffect } from '@react-navigation/native'
import { deleteObject, patch } from '../fetch/generalFetch'
import { CustomButton } from '../components/Buttons'
import Space from '../components/Space'
import { AchieveListItem } from '../components/ListItem'

// paramaters of custom button to remove goal
function removeButton( url, deleted, onpress) {
    url = url + "/remove"
    return({
        text: 'Move On From This Goal',
        color: GoalsStyle.theme.color,
        onpress: onpress,
        deleted: deleted
    })
}

// paramaters of custom button to delete current goal
function deleteButton(onpress) {
    return({
        text: 'Delete',
        color: GoalsStyle.theme.color,
        onpress: onpress
    })
}

// paramaters of custom button to return to goals screen
function backButton(onpress) {
    return({
        text: 'Back',
        color: GoalsStyle.theme.color,
        onpress: onpress
    })
}

// paramaters of custom button to view progress
function progressButton() {
    return({
        text: 'View Progress',
        color: GoalsStyle.theme.color
    })
}

// paramaters of custom button to add subgoal
function newSubgoalButton(onpress) {
    return({
        text: 'Add Subgoal',
        color: GoalsStyle.theme.color,
        onpress: onpress
    })
}

// view specific goals
const GoalScreen = ({route, navigation}) => {
    const { url } = route.params
    const { goalsUrl } = route.params
    const [goal, setGoal] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [subgoals, setSubgoals] = useState([])
    // delete and go to goals screen when deleted
    const deletePress = () => {
        deleteObject(url)
        navigation.navigate('Goals')
    }
    // go to goals screen if back button is pressed
    const backPress = () => {
        navigation.navigate('Goals')
    }
    // update with red banner to inform user goal is removed (not permanant)
    const removePress = async () => {
        const updatedGoal = await patch(url+"/remove", true)
        setDeleted(true)
        setGoal(updatedGoal)
    }
    // show new form for subgoal when new subgoal button pressed
    const goalPress = () => {
        navigation.navigate("NewGoalForm", {url:url})
    }
    try {
        // get and update goal when fetched
        async function getGoal() {
            const goal = await getObject(url)
            setGoal(goal)
            setDeleted(goal.deleted)
        }
         // get and update subgoals when fetched
        async function getSubgoals() {
            const subgoals = await getObject(url+"/subgoals")
            setSubgoals(subgoals)
        }
        useEffect(() => {
            // update goals and subgoals
            getGoal()
            getSubgoals()
        },[])
        useFocusEffect(
            // update goals and subgoals everytime it is on the page
            React.useCallback(() => {
                getGoal()
                getSubgoals()
            }, [])
        )
    } catch (error) {
        console.log(error)
    }
    return (
        <View style={GoalsStyle.container}>
            <View style={GoalsStyle.horizontalAlign}>
                <CustomButton button={backButton(backPress)}/>
                <CustomButton button={progressButton()}/>
                <CustomButton button={newSubgoalButton(goalPress)}/>
            </View>
            <GoalInfo 
                object={goal}
                objectType={"Goal"}
                url={url} 
                navigation={navigation}
                styling={GoalsStyle}
            />
            <View>
            <Text>Subgoals:</Text>
            <FlatList
                style={{alignSelf:'stretch'}}
                data={subgoals}
                renderItem={({item}) => 
                <AchieveListItem 
                    item={item} 
                    url={goalsUrl} 
                    styling={GoalsStyle}
                    navigation={navigation}
                    itemType={"Goal"}
                />}
            />
            </View>
            <CustomButton button={removeButton(url, deleted, removePress)}/>
            <Space />
            <CustomButton button={deleteButton(deletePress)}/>
        </View>
    )
}



export default GoalScreen;
