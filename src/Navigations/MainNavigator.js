import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchPage from '../Pages/SearchPage';

const Stack = createStackNavigator();

const MainNavigator =() =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="TabNavigator" component={TabNavigator}/>
                <Stack.Screen
                options={{
                    //headerTitleAlign: 'center', 
                    title: "Search",
                }}
                
                name="SearchPage" component={SearchPage}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}

export default MainNavigator;