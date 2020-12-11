import React from 'react'
import { Text, View } from 'react-native'
import { DeletedBanner, CustomSliderContainer } from './Buttons'
import Space from './Space'
import { Box } from './ListItem'

const GoalInfo = (object) => {
    let objectInstance = null
    let url = ""
    let creationDate = Date.now()
    const currentDate = Date.now()
    let daysCreated = 0
    let deleted = false
    let mini = false
    let style = null
    let disable = false
    const objectType = 'Goal'
    // true if goal type, false if habit type
    let once = true
    try {
        style = object.styling
        objectInstance = object.object
        if (!objectInstance) {
            return null
        }

        console.log( objectInstance)
        if (objectInstance.subgoal == false) {
            console.log("disbaling...")
            if (objectInstance.subGoals.length > 0) {
                disable = true
            }
        } 

        deleted = objectInstance.deleted
        url = object.url
        
        // find out how long this object has been created for
        creationDate = new Date(objectInstance.dateCreated)
        const timeCreated = (currentDate - creationDate)/(1000*60*60*24)
        daysCreated = Math.ceil(timeCreated)

    } catch (error) {
        console.log(error)
        return <View><Text>An error has occured</Text></View>;
    }
    return (
        // close up view of details of specific habit
        <View style={style.bodyContainer}>
            <DeletedBanner deleted={deleted}/>
            <Space />
            <View style={style.body}>
                <Text style={style.title}>{objectInstance.name}</Text>
                <CustomSliderContainer 
                    url={url} 
                    styling={style} 
                    deleted={deleted} 
                    mini={mini}
                    type={objectType}
                    disable={disable}
                />
                <Text 
                    style={style.text}>
                    Aimed Completion Time: {objectInstance.custom} {objectInstance.frequency}s
                </Text>
                <Text 
                    style={style.text}>
                    It has been {daysCreated} days since you have created this goal
                </Text>
                <Text 
                    style={style.text}>
                    Created: {creationDate.toDateString()}
                </Text>
            </View>
        </View>
    );
}

const ObjectInfo = (object) => {
    console.log(object)
    let objectInstance = null
    let url = ""
    let creationDate = Date.now()
    const currentDate = Date.now()
    let daysCreated = 0
    let deleted = false
    let mini = false
    let style = null
    // true if goal type, false if habit type
    let once = true
    let objectType = ""
    let timesAchieved = 0
    try {
        style = object.styling
        objectInstance = object.object
        if (!objectInstance) {
            return null
        }
        if (object.objectType === 'Habit') {
            once = false
            timesAchieved = objectInstance.datesAchieved.length
        }
        if (object.objectType === 'Achievement') {
            timesAchieved = object.timesAchieved
        } 
        objectType = object.objectType
        deleted = objectInstance.deleted
        url = object.url
        
        // find out how long this object has been created for
        creationDate = new Date(objectInstance.dateCreated)
        const timeCreated = (currentDate - creationDate)/(1000*60*60*24)
        daysCreated = Math.ceil(timeCreated)

    } catch (error) {
        console.log(error)
        return <View><Text>An error has occured</Text></View>;
    }
    return (
        // close up view of details of specific habit
        <View style={style.bodyContainer}>
            <DeletedBanner deleted={deleted}/>
            <Space />
            <View style={style.body}>
                <Text style={style.title}>{objectInstance.name}</Text>
                <CustomSliderContainer 
                    url={url} 
                    styling={style} 
                    deleted={deleted} 
                    mini={mini}
                    type={objectType}
                    disable={false}
                />
                <Text 
                    style={style.text}>
                    {once ? 'Aimed Time: ': 'Frequency: Every'} {objectInstance.custom} {objectInstance.frequency}s
                </Text>
                <Text 
                    style={style.text}>
                    Created: {creationDate.toDateString()}
                </Text>
                <Text style={style.text}>
                    You have completed this: {objectType.toLowerCase()} {timesAchieved} times in {daysCreated} days!!!
                </Text>
            </View>
        </View>
    );
}

const AchievementInfo = (object) => {
    console.log("sdfghjhgfdfg", object)
    let achievement = null
    let url = ""
    let creationDate = Date.now()
    const currentDate = Date.now()
    let daysCreated = 0
    // true if goal type, false if habit type
    let once = true
    let timesAchieved = 0
    let objectType = ""
    let style = {}
    let deleted = false
    try {
        style = object.styling
        achievement = object.object
        console.log(achievement)
        if (!achievement) {
            return null
        }
        if (achievement.typeOfAchievement === 'Habit') {
            once = false
        }
        timesAchieved = object.timesAchieved
        objectType = object.objectType
        deleted = achievement.deleted
        url = object.url
        
        // find out how long this object has been created for
        creationDate = new Date(achievement.dateCreated)
        const timeCreated = (currentDate - creationDate)/(1000*60*60*24)
        daysCreated = Math.ceil(timeCreated)

    } catch (error) {
        console.log(error)
        return <View><Text>An error has occured</Text></View>;
    }
    return (
        // close up view of details of specific habit
        <View style={style.bodyContainer}>
            <DeletedBanner deleted={deleted}/>
            <Space />
            <View style={style.body}>
                <Text style={style.title}>{achievement.name}</Text>
                <Box text={timesAchieved}/>
                <Text 
                    style={style.text}>
                    Created: {creationDate.toDateString()}
                </Text>
                <Text style={style.text}>
                    You have completed this {objectType.toLowerCase()} {timesAchieved} times in {daysCreated} days!!!
                </Text>
            </View>
        </View>
    );
}

export { ObjectInfo, AchievementInfo, GoalInfo } ;