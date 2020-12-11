import React from 'react'
import {StyleSheet,Text,View, TouchableOpacity}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default class Header extends React.Component {
    render(){
        const style = this.props.color
        return(
            <View style = { [ styles.header, {backgroundColor: style }]}>
                <TouchableOpacity style = {styles.icon}>
                    <FontAwesomeIcon icon={ faBars } size = {32} />
                </TouchableOpacity>
                <Text style = {styles.headerText}>{this.props.title}</Text>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',   
    },
    headerText: {
        fontWeight: '600',
        fontSize: 40,
    },
    icon:{
        position: 'absolute',
        left: 16, 
        top: 25      
    },
    
});