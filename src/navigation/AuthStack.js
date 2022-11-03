import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen">
          {(props) => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator> 

  //   <NavigationContainer>
  //   <Stack.Navigator initialRouteName="Login"
  //   initialRouteName={user ? 'HomeScreen' : 'Login'} 
  //   screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="HomeScreen">
  //         {(props) => <HomeScreen {...props} extraData={user} />}
  //       </Stack.Screen>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Signup" component={SignupScreen} />
    
  //   </Stack.Navigator>
  // </NavigationContainer>
 );
}

