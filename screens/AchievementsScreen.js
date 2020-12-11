import React, { useState, useEffect } from 'react'
import { 
    View, 
    FlatList, 
    ScrollView
} from 'react-native'
import { ListItem } from '../components/ListItem'
import { getObject } from '../fetch/generalFetch'
import AchievementsStyle from '../styles/achievementsStyle'
import { host_path } from '../components/header_types'
import { useFocusEffect } from '@react-navigation/native'
import { Dropdown } from 'react-native-material-dropdown';

// view all achievements (Achievements page)
const AchievementsScreen = ({navigation}) => {
    const achievementsUrl = host_path + "/api/achievements"
    const [achievements, setAchievements] = useState(null)
    const [type, setType] = useState("All")
    // options for types of achievements in drop down
    const options = [
        {value: 'All'},
        {value: 'Habit'},
        {value: 'Goal'},
        {value: 'General'}
    ]
    let showAchievements = () => {}
    try {
        // get achievements
        async function getAchievements(url, type) {
            let getUrl = url
            if (type !== "All") {
                getUrl = getUrl + "/type/" + type
            }
            const achievements = await getObject(getUrl)
            setAchievements(achievements)
        }
        showAchievements = (achievementsUrl, type) => {
            getAchievements(achievementsUrl, type)
        }
        useEffect(() => {
            getAchievements(achievementsUrl, type)
        }, [])
        useFocusEffect(
            React.useCallback(() => {
                // to refresh everytime the page is 'refreshed'
                setAchievements([])
                getAchievements(achievementsUrl, type)
            }, []
        ))
    } catch (error) {
        console.log(error)
        return (
            <View style={AchievementsStyle.container}>
            </View>
        )
    }
    // return template for achievements page
    return (
        <View style={AchievementsStyle.container}>
            <View style={AchievementsStyle.container}>
                <Dropdown
                    label='Type of Achievements'
                    data={options}
                    value={type}
                    onChangeText={ (type) => {
                        setType(type)
                        showAchievements(achievementsUrl, type)
                    }}
                />
            </View>
            <ScrollView style={AchievementsStyle.bodyContainer}>
                <FlatList
                    style={{alignSelf:'stretch'}}
                    data={achievements}
                    renderItem={({item}) => 
                    <ListItem 
                        item={item}
                        url={achievementsUrl} 
                        navigation={navigation}
                        itemType={"Achievement"}
                    />}
                />
            </ScrollView>
        </View>
    );
}

export default AchievementsScreen;

