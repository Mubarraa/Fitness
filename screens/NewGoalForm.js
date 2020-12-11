
import React, { useState } from 'react'
import { 
    View, 
    Text,
    TextInput,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from '../components/Buttons'
import GoalsStyle from '../styles/goalsStyle'
import Space from '../components/Space'
import { makeNewPost } from '../fetch/generalFetch'

function createGoalButton(onpress) {
    return({
        text: "Create Goal",
        color: GoalsStyle.theme.color,
        onpress: onpress
    })
}

// create new habit
function NewGoalForm({route, navigation}) {
    const { url } = route.params
    const [goalName, setGoalName] = useState("")
    const [goalCustom, setGoalCustom] = useState()
    const [selectedFrequency, setSelectedFrequency] = useState("Day");
    // limited values for frequency
    const frequency = [
        {label:"Day(s)", value:"Day"},
        {label:"Week(s)", value:"Week"},
        {label:"Month(s)", value:"Month"},
        {label:"Year(s)", value:"Year"}
    ]
    const onpress = async () => {
        // create new goal given parameters
        const newGoal = await makeNewPost(url,
            {name: goalName, 
            frequency: selectedFrequency,
            custom: goalCustom,
        })
        const id = newGoal._id
        // go to new habit page upon completion
        navigation.navigate("Goal", {url:url+"/"+id})
    }
    // return template of new goal form
    return (
        <View style={GoalsStyle.container}>
            <View style={GoalsStyle.body}>
                <Space/>
                <Text style={GoalsStyle.text}>
                    Create a new habit and start tracking!!! 
                </Text>
                <Space/>
                <Text style={GoalsStyle.label}>
                    Name of habit you want to track 
                </Text>
                <TextInput 
                    style={GoalsStyle.textInput}
                    placeholder="Name of Goal"
                    onChangeText={(goalName) => setGoalName(goalName)}
                />
                <Space/>
                <Text style={GoalsStyle.label}>
                    Timeframe to complete this goal?
                </Text>
                <View margin={10} flexDirection='row' alignItems='baseline'>
                    <Text style={GoalsStyle.label}>
                        In 
                    </Text>
                    <TextInput 
                    style={GoalsStyle.textInput}
                    keyboardType={'number-pad'}
                    placeholder="1"
                    onChangeText={(goalCustom) => setGoalCustom(goalCustom)}
                    />
                    <View style={GoalsStyle.picker}>
                        <RNPickerSelect
                            selectedFrequency={selectedFrequency}
                            onValueChange={(itemValue) => setSelectedFrequency(itemValue)}
                            items={frequency}
                        /> 
                    </View>
                </View> 
                <Space/>
                <CustomButton 
                    button={createGoalButton(onpress)}
                    style={GoalsStyle.button}
                />
                <Space/>
            </View>
        </View>
    );
}

export default NewGoalForm;
