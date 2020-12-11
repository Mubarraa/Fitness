import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import React from "react";

/* -------------------------------------------------------------------------- */
/*                     Pages or Routes render componenets                     */
/* -------------------------------------------------------------------------- */

import GoalsScreen from '../screens/GoalsScreen';
import GoalScreen from '../screens/GoalScreen';
import NewGoalForm from '../screens/NewGoalForm';
import {CustomProfileButton} from '../components/Buttons'

const Stack = createStackNavigator();

const options = {
    headerStyle: {
        backgroundColor: 'moccasin',
        height: 100
    },
    headerRight: () => (
      <CustomProfileButton/>
    )
  }

function Goal_Stack() {
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen
                name="Goals"
                component={GoalsScreen}
                options={{headerTitle: "Goals"}}
            />

            <Stack.Screen
                name="NewGoalForm"
                component={NewGoalForm}
                options={{headerTitle: "Create A New Goal"}}
            />
            <Stack.Screen
                name="Goal"
                component={GoalScreen}
                options={{headerTitle: "Goals"}}
            />
        </Stack.Navigator>
    );
}

export default Goal_Stack;
