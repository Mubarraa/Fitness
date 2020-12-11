import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
//import { exp } from "react-native-reanimated";

/* -------------------------------------------------------------------------- */
/*                     Pages or Routes render componenets                     */
/* -------------------------------------------------------------------------- */

import Register from "./Register";
import Login from "./Login";
import ExtraInfo from "./ExtraInfo";
import Water from "./Water";
import Exercise from "./Exercise";
import Strength from "./Strength";
import Balance from "./Balance";
import Endurance from "./Endurance";
import Flexibility from "./Flexibility";
import Food from "./Food";
import Home from "./Home";
import AchievementsScreen from "../screens/AchievementsScreen";
import AchievementScreen from "../screens/AchievementScreen";
import GoalsScreen from "../screens/GoalsScreen";
import GoalScreen from "../screens/GoalScreen";
import NewGoalForm from "../screens/NewGoalForm";
import HabitsScreen from "../screens/HabitsScreen";
import HabitScreen from "../screens/HabitScreen";
import NewHabitForm from "../screens/NewHabitForm";
import { host_path } from "./header_types";

const Stack = createStackNavigator();

function Main_Stack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerLeft: null, headerTransparent: true }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerLeft: null, headerTransparent: true }}
                />
                <Stack.Screen
                    name="Extra Info"
                    component={ExtraInfo}
                    options={{
                        headerLeft: null,
                        headerTransparent: true,
                        title: "Add your weight(kg) and height(cm):",
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerLeft: null, headerTransparent: true , title: null}}
                />
                <Stack.Screen
                    name="Food"
                    component={Food}
                    options={{ headerTransparent: true }}
                />
                <Stack.Screen
                    name="Water"
                    component={Water}
                    options={{ headerTransparent: true }}
                />
                <Stack.Screen
                    name="Exercise"
                    component={Exercise}
                    options={{ headerTransparent: true , title: null}}
                />
                <Stack.Screen
                    name="Strength"
                    component={Strength}
                    options={{ headerLeft: null, headerTransparent: true }}
                />
                <Stack.Screen
                    name="Endurance"
                    component={Endurance}
                    options={{ headerLeft: null, headerTransparent: true }}
                />
                <Stack.Screen
                    name="Flexibility"
                    component={Flexibility}
                    options={{ headerLeft: null, headerTransparent: true }}
                />
                <Stack.Screen
                    name="Balance"
                    component={Balance}
                    options={{ headerLeft: null, headerTransparent: true }}
                />
                <Stack.Screen
                    name="Achievements"
                    component={AchievementsScreen}
                    options={{ headerTitle: "Achievements" }}
                />
                <Stack.Screen
                    name="Achievement"
                    component={AchievementScreen}
                    options={{ headerTitle: "Achievements" }}
                />
                <Stack.Screen
                    name="Goals"
                    component={GoalsScreen}
                    options={{ headerTitle: "Goals" }}
                />

                <Stack.Screen
                    name="NewGoalForm"
                    component={NewGoalForm}
                    options={{ headerTitle: "Create A New Goal" }}
                />
                <Stack.Screen
                    name="Goal"
                    component={GoalScreen}
                    options={{ headerTitle: "Goals" }}
                />
                <Stack.Screen
                    name="Habits"
                    component={HabitsScreen}
                    options={{ headerTitle: "Habits" }}
                />
                <Stack.Screen
                    name="NewHabitForm"
                    component={NewHabitForm}
                    options={{ headerTitle: "Create A New Habit" }}
                />
                <Stack.Screen
                    name="Habit"
                    component={HabitScreen}
                    options={{ headerTitle: "Habits" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main_Stack;
