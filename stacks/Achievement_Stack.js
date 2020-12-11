import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

/* -------------------------------------------------------------------------- */
/*                     Pages or Routes render componenets                     */
/* -------------------------------------------------------------------------- */

import AchievementsScreen from '../screens/AchievementsScreen';
import AchievementScreen from '../screens/AchievementScreen';
import {CustomProfileButton} from '../components/Buttons'

const Stack = createStackNavigator();

const options = {
    headerStyle: {
        backgroundColor: 'mediumspringgreen',
        height: 100
    },
    headerRight: () => (
      <CustomProfileButton/>
    )
  }

function Achievement_Stack() {
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen
                name="Achievements"
                component={AchievementsScreen}
                options={{headerTitle: "Achievements"}}
            />
            <Stack.Screen
                name="Achievement"
                component={AchievementScreen}
                options={{headerTitle: "Achievements"}}
            />
        </Stack.Navigator>
    );
}

export default Achievement_Stack;
