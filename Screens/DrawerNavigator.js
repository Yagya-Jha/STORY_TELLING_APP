import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import StackNavigator from './StackNavigator';
import Profile from './Profile'
import Logout from './Logout';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ()=>{
    return(
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component = {StackNavigator}></Drawer.Screen>
            <Drawer.Screen name = "Profile" component = {Profile}></Drawer.Screen>
            <Drawer.Screen name = "Logout" component = {Logout}></Drawer.Screen>
        </Drawer.Navigator>
        )
}

export default DrawerNavigator;