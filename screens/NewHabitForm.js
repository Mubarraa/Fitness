
import React, { useState } from 'react'
import { 
    View, 
    Text,
    TextInput,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from '../components/Buttons'
import HabitsStyle from '../styles/habitsStyle'
import Space from '../components/Space'
import { makeNewPost } from '../fetch/generalFetch'

function createHabitButton(onpress) {
    return({
        text: "Create Habit",
        color: HabitsStyle.theme.color,
        onpress: onpress
    })
}

// create new habit
function NewHabitForm({route, navigation}) {
    const { url } = route.params
    const [habitName, setHabitName] = useState("")
    const [habitCustom, setHabitCustom] = useState()
    const [selectedFrequency, setSelectedFrequency] = useState("Day");
    const [selectedHabitType, setSelectedHabitType] = useState(true);
    // limited values for frequency
    const frequency = [
        {label:"Hour(s)", value:"Hour"},
        {label:"Day(s)", value:"Day"},
        {label:"Week(s)", value:"Week"},
        {label:"Month(s)", value:"Month"}
    ]
    // customise good or bad habit
    const habitType = [
        {label:"Positive", value:true},
        {label:"Negative", value:false},
        ]
    const onpress = async () => {
        // create new habit given parameters
        const newHabit = await makeNewPost(url,
            {name: habitName, 
            frequency: selectedFrequency,
            custom: habitCustom,
            good: selectedHabitType
        })
        const id = newHabit._id
        // go to new habit page upon completion
        navigation.navigate("Habit", {url:url+"/"+id})
        }
    // return template of new habit form
    return (
        <View style={HabitsStyle.container}>
            <View style={HabitsStyle.body}>
                <Space/>
                <Text style={HabitsStyle.text}>
                    Create a new habit and start tracking!!! 
                </Text>
                <Space/>
                <Text style={HabitsStyle.label}>
                    Name of habit you want to track 
                </Text>
                <TextInput 
                    style={HabitsStyle.textInput}
                    placeholder="Name of Habit"
                    onChangeText={(habitName) => setHabitName(habitName)}
                />
                <Space/>
                <Text style={HabitsStyle.label}>
                    How often do you want to complete this habit?
                </Text>
                <View margin={10} flexDirection='row' alignItems='baseline'>
                    <Text style={HabitsStyle.label}>
                        Every 
                    </Text>
                    <TextInput 
                    style={HabitsStyle.textInput}
                    keyboardType={'number-pad'}
                    placeholder="1"
                    onChangeText={(habitCustom) => setHabitCustom(habitCustom)}
                    />
                    <View style={HabitsStyle.picker}>
                        <RNPickerSelect
                            selectedFrequency={selectedFrequency}
                            onValueChange={(itemValue) => setSelectedFrequency(itemValue)}
                            items={frequency}
                        /> 
                    </View>
                </View> 
                <Space/>
                <Text style={HabitsStyle.label}>
                    Is this a positive or negative habit?
                </Text>
                <View style={HabitsStyle.picker}>
                    <RNPickerSelect
                        fontSize={20}
                        selectedHabitType={selectedHabitType}
                        onValueChange={(itemValue) => setSelectedHabitType(itemValue)}
                        items={habitType}
                    /> 
                </View>  
                <Space/>
                <CustomButton 
                    button={createHabitButton(onpress)}
                    style={HabitsStyle.button}
                />
                <Space/>
            </View>
        </View>
    );
}

export default NewHabitForm;
