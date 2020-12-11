import { StyleSheet } from 'react-native'
const AchievementsStyle = StyleSheet.create({
    container: {
        justifyContent: 'space-around'
    },
    header: {
        backgroundColor: 'palegreen',
        alignSelf: 'stretch'
    },
    bodyContainer: {
        backgroundColor: 'palegreen',
        alignSelf: 'stretch',
        flexWrap: 'wrap',
        padding: 10,
    },
    body: {
        backgroundColor: 'palegreen',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    horizontalAlign: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    label: {
        fontSize: 20,
        textAlign: 'center'
    },
    textInput: {
        fontSize: 18,
        backgroundColor: 'white',
        alignSelf:'stretch',
        padding: 10,
        margin: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10
    },
    theme: {
        color: 'mediumspringgreen'
    },
    picker: {
        backgroundColor: 'white',
        alignSelf:'stretch',
        padding: 10,
        margin: 10
    },
    button: {
        padding: 10,
        margin: 10
    }
});

export default AchievementsStyle