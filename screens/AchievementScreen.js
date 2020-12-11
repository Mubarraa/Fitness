
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { AchievementInfo } from '../components/Object'
import AchievementsStyle from '../styles/achievementsStyle'
import { getObject } from '../fetch/generalFetch'
import { useFocusEffect } from '@react-navigation/native'
import { deleteObject, patch } from '../fetch/generalFetch'
import { CustomButton } from '../components/Buttons'
import Space from '../components/Space'

// parameters for custom remove button
function removeButton( url, deleted, onpress) {
    url = url + "/remove"
    return({
        text: "I don't want to see this achievement anymore",
        color: AchievementsStyle.theme.color,
        onpress: onpress,
        deleted: deleted
    })
}

// parameters for custom delete button
function deleteButton(onpress) {
    return({
        text: 'Delete',
        color: AchievementsStyle.theme.color,
        onpress: onpress
    })
}

// parameters for custom back button
function backButton(onpress) {
    return({
        text: 'Back',
        color: AchievementsStyle.theme.color,
        onpress: onpress
    })
}

// parameters for custom progress button
function progressButton(style) {
    return({
        text: 'View Progress',
        color: AchievementsStyle.theme.color
    })
}

// view specific achievements
const AchievementScreen = ({navigation, route}) => {
    const { url } = route.params
    const [achievement, setAchievement] = useState(null)
    const [deleted, setDeleted] = useState(false)
    // go back to achievements screen if acheievement is deleted
    const deletePress = () => {
        deleteObject(url)
        navigation.navigate('Achievements')
    }
    // got back to achievements screen if back button is pressed
    const backPress = () => {
        navigation.navigate('Achievements')
    }
    // show deleted banner if user removes achievement from ongoing
    const removePress = async () => {
        const updatedAchievement = await patch(url+"/remove", true)
        setDeleted(true)
        setAchievement(updatedAchievement)
    }
    try {
        // get achievement
        async function getAchievement() {
            const achievement = await getObject(url)
            setAchievement(achievement)
            setDeleted(achievement.deleted)
        }
        useEffect(() => {
            getAchievement()
        },[])
        useFocusEffect(
            React.useCallback(() => {
                getAchievement()
            }, [])
        )
    } catch (error) {
        console.log(error)
    }
    // return template of achievement
    return (
        <View style={AchievementsStyle.container}>
            <View style={AchievementsStyle.horizontalAlign}>
                <CustomButton button={backButton(backPress)}/>
                <CustomButton button={progressButton()}/>
            </View>
            <AchievementInfo 
                object={achievement}
                url={url} 
                navigation={navigation}
                styling={AchievementsStyle}
                objectType={'Achievement'}
            />
            <CustomButton button={removeButton(url, deleted, removePress)}/>
            <Space />
            <CustomButton button={deleteButton(deletePress)}/>
        </View>
    )
}



export default AchievementScreen;
