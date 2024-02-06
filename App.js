import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { StatusBar } from 'expo-status-bar';

import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Profile from './app/screens/Profile';
import Register from './app/screens/Register';

const OutsideStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <InsideStack.Screen name="Profile" component={Profile} options={{ headerStyle: {backgroundColor: AppTheme.colors.background} }} />
    </InsideStack.Navigator>
  )
}

function OutsideLayout() {
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <OutsideStack.Screen name='Register' component={Register} options={{ headerStyle: {backgroundColor: AppTheme.colors.background} }} />
    </OutsideStack.Navigator>
    
  )
}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#252627",
    text: "#fff"
  },
}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      // console.log("user", user);
      setUser(user);
    })
  })
  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar hidden />
      <Stack.Navigator initialRouteName='Login' >
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} />
        ): (
          <Stack.Screen name='Outside' component={OutsideLayout} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

