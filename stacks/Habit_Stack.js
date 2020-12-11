import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

/* -------------------------------------------------------------------------- */
/*                     Pages or Routes render componenets                     */
/* -------------------------------------------------------------------------- */

import HabitsScreen from '../screens/HabitsScreen';
import HabitScreen from '../screens/HabitScreen';
import NewHabitForm from '../screens/NewHabitForm';
import {CustomProfileButton} from '../components/Buttons'

const Stack = createStackNavigator();

const options = {
    headerStyle: {
        backgroundColor: 'paleturquoise',
        height: 100
    },
    headerRight: () => (
      <CustomProfileButton/>
    )
  }

function Habit_Stack(url) {
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen
                name="Habits"
                component={HabitsScreen}
                options={{headerTitle: "Habits"}}
            />
            <Stack.Screen
                name="NewHabitForm"
                component={NewHabitForm}
                options={{headerTitle: "Create A New Habit"}}
            />
            <Stack.Screen
                name="Habit"
                component={HabitScreen}
                options={{headerTitle: "Habits"}}
            />
        </Stack.Navigator>
    );
}

export default Habit_Stack;
