import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../Main'
import AddNotes from '../AddNotes'
import EditNotes from '../EditNotes'
import Bottomnav from './Bottomnav'
import useNotes from './useNotes'
const Stack = createStackNavigator()
const StackNav = () => {
  const {
    textColor,
    isEnabled,
    headerColor
  } = useNotes()
  return (
    <Stack.Navigator initialRouteName='BottomNav' screenOptions={
      {
        headerShown: false
      }
    }>
      <Stack.Screen name='BottomNav' component={Bottomnav} />
      <Stack.Screen options={{
        headerShown: true,
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: isEnabled ? headerColor : null
        }
      }}
        name='AddNotes' component={AddNotes} />
      <Stack.Screen options={{
        headerShown: true,
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: isEnabled ? headerColor : null
        }
      }}
        name='EditNotes' component={EditNotes} />
    </Stack.Navigator>
  )
}

export default StackNav