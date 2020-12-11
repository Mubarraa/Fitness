import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { CustomSliderContainer } from './Buttons'

const ListItemStyle = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',
        alignContent: 'stretch',
        borderColor: 'white',
        borderBottomWidth: 5,
    },
    titleWithSlider: {
        flexDirection: 'row',
        alignContent: 'space-around',
        flexWrap: 'wrap',
        alignSelf: 'stretch'
    },
    title: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    box: {
        padding: 5,
        alignSelf: 'flex-end',
        borderWidth: 3,
        borderColor: 'white'
    }, 
    text: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const AchieveListItem = (item) => {
    const object = item.item
    const url = item.url + "/" + object._id
    const style = item.styling
    const deleted = object.deleted
    const mini = true
    const nav = item.navigation
    const itemType = item.itemType
    let disable = false
    if (itemType == 'Goal') {
        if (object.subgoal === false) {
            disable = true
        }
    }
    const onpress = () =>{
        nav.navigate(itemType, { url: url })
    }
    return (
        // add on press, move to (specific) page
        <TouchableOpacity onPress={onpress}>
            <View style={ListItemStyle.container}>
                <View style={ListItemStyle.titleWithSlider}>
                    <Text style={ListItemStyle.title}>
                        {object.name}
                    </Text> 
                    <CustomSliderContainer 
                        url={url} 
                        styling={style} 
                        deleted={deleted} 
                        mini={mini}
                        disable={disable}
                        type={itemType}
                    /> 
                </View>
            </View>
        </TouchableOpacity>
    );
}

const ListItem = (item) => {
    const object = item.item
    const url = item.url + "/" + object._id
    const style = item.styling
    const nav = item.navigation
    const itemType = item.itemType
    const onpress = () =>{
        nav.navigate(itemType, { url: url })
    }
    const timesAchieved = object.timesAchieved
    return (
        // add on press, move to (specific) page
        <TouchableOpacity onPress={onpress}>
            <View style={ListItemStyle.container}>
                <View style={ListItemStyle.titleWithSlider}>
                    <Box text={timesAchieved}/>
                    <Text style={ListItemStyle.title}>
                        {object.name}
                    </Text> 
                </View>
            </View>
        </TouchableOpacity>
    );
}

const Box = (item) => {
    const style = item.styling
    const text = item.text
    return (
        <View style={ListItemStyle.box}>
            <Text style={ListItemStyle.text}>{text}</Text>
        </View>
    )
}

export { AchieveListItem, ListItem, Box }