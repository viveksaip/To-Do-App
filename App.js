import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';


import Home from './Screens/Home';
import Details from "./Screens/Details";

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name = 'Home'
          component={Home}
        />
        <Stack.Screen
          name = 'Details'
          component = {Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}











