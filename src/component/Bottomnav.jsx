import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../Main';
import Setting from '../Setting';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import useNotes from './useNotes';
const Tab = createBottomTabNavigator();
const Bottomnav = () => {
    const{
        background,
        isEnabled,
        headerColor,
        textColor
    } = useNotes()
    return (
        <Tab.Navigator initialRouteName='Main' screenOptions={{
            headerShown: false,
            tabBarStyle:{
                backgroundColor:isEnabled?'black':'white'
            }
        }}>
            <Tab.Screen name="Main" component={Main}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons
                                name="home"
                                size={24}
                                color={isEnabled?(focused ? 'blue' : 'white'):(focused ? 'blue' : 'black')}
                            />
                        )
                    },
                    // 20521850
                }}
            />
            <Tab.Screen name="Settings" component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name="setting"
                                size={24}
                                color={isEnabled?(focused ? 'blue' : 'white'):(focused ? 'blue' : 'black')}
                            />
                        )
                    },
                    headerShown:true,
                    headerTintColor:textColor,
                    headerStyle:{
                        backgroundColor:isEnabled?headerColor:null
                    }
                    // 20521850
                }}
            />
        </Tab.Navigator>
    )
}

export default Bottomnav