
import React, { useState, useEffect } from 'react'
import { 
    View, 
    FlatList, 
    Text,
    ScrollView
} from 'react-native'
import { AchieveListItem } from '../components/ListItem'
import { getObject } from '../fetch/generalFetch'
import GoalsStyle from '../styles/goalsStyle'
import { CustomButton } from '../components/Buttons'
import { host_path } from '../components/header_types'
import { useFocusEffect } from '@react-navigation/native'
import { Dropdown } from 'react-native-material-dropdown';

// parameters for custom button to add new goal
const addGoalButton = (onpress) => {
    return({
        text: "Add my personalised goal",
        color: GoalsStyle.theme.color,
        onpress: onpress
    })
}

// view all goals (Goals page)
const GoalsScreen = ({routes, navigation}) => {
    const goalsUrl = host_path + "/api/goals"
    const [goals, setGoals] = useState([])
    const [type, setType] = useState("All")
    // options for dropdown menu to view different types of goals
    const options = {
        "All": {text: "Goals You Are Tracking:", url: "/"},
        "Top Level Goals": {text: "Your Long Term goals:", url: "/topLevel"} ,
        "Completed": {text: "Goals You Have Completed ", url: "/completed"},
        "Removed": {text: "Previous Goals:", url: "/removed"}
    }
    const dropOptions = [
        {value: "All"},
        {value: "Top Level Goals"},
        {value: "Completed"},
        {value: "Removed"}
    ]
    const [text, setText] = useState(options["All"].text)
    let showGoals = () => {}
    const addGoalPress = () => {
        navigation.navigate("NewGoalForm", {url:goalsUrl})
    }
    try {
        // get goals given option type
        async function getGoals() {
            const goals = await getObject(goalsUrl+options[type].url)
            setGoals(goals)
        }
        useEffect(() => {
            getGoals(goalsUrl)
        }, [])
        useFocusEffect(
            React.useCallback(() => {
                // reset goals everytime
                setGoals([])
                setType("All")
                setText(options[type].text)
                getGoals()
            }, []
        ))
        showGoals = () => {
            getGoals()
        }
    } catch (error) {
        console.log(error)
        return (
            <View style={GoalsStyle.container}>
            </View>
        )
    }
    // retunr template for goals screen
    return (
        <View style={GoalsStyle.container}>
            <View style={GoalsStyle.container}>
                <CustomButton button={addGoalButton(addGoalPress)} />
                <Dropdown
                    label='Type of Goals'
                    data={dropOptions}
                    value={type}
                    onChangeText={ (type) => {
                        setType(type)
                        setText(options[type].text)
                        showGoals()
                    }}
                />
            </View>
            <ScrollView style={GoalsStyle.bodyContainer}>
                <Text style={GoalsStyle.text}>
                    {text}
                </Text>
                <FlatList
                    style={{alignSelf:'stretch'}}
                    data={goals}
                    renderItem={({item}) => 
                    <AchieveListItem 
                        item={item} 
                        url={goalsUrl} 
                        goalsUrl={goalsUrl} 
                        styling={GoalsStyle}
                        navigation={navigation}
                        itemType={"Goal"}
                    />}
                />
            </ScrollView>
        </View>
    );
}



export default GoalsScreen;
