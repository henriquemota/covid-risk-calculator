import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './pages/home'

export default function Routes() {
  const AppStack = createStackNavigator()
  // const AppStack = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false, backgroundColor: 'red' }}
      >
        <AppStack.Screen
          name='home'
          component={Home}
          options={{ title: 'Home' }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
