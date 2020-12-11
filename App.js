
/*import Main_Stack from "./components/Main_Stack";

export default function App() {
    return <Main_Stack />;
}*/

import 'react-native-gesture-handler'
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Habit_Stack from './stacks/Habit_Stack'
import Goal_Stack from './stacks/Goal_Stack'
import Achievement_Stack from './stacks/Achievement_Stack'
import Main_Stack from "./components/Main_Stack";

export default function App() {
    return <Main_Stack />;
}
/*const Stack = createStackNavigator();
//async storage
const App = () => {
    return (
      <NavigationContainer>
        <Goal_Stack/>
      </NavigationContainer>
    )
}*/
/*<Habit_Stack/>
      <Achievement_Stack/>*/
//export default App;

