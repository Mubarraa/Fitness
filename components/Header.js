import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const HeaderStyle = StyleSheet.create({
    container : {
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'baseline',
        flexDirection: 'row',
        alignContent: 'stretch'
    },
    title: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 2
    },
    profileButton: {
        paddingRight: 10,
        flex: 1
    }
});

const Header = ({title}) => {
    return (
        <SafeAreaView>
            <View style={HeaderStyle.container}>
                <MaterialIcons 
                    name='dehaze' 
                    size={40} 
                    style={HeaderStyle.profileButton}
                    /// TBC function to go to profile page
                    onPress={()=>goToProfilePage()}
                />
                <Text style={HeaderStyle.title}>{title}</Text>
            </View>
        </SafeAreaView>
    );
}

export default Header;