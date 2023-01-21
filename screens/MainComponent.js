import { View } from 'react-native'
import HomeScreen from './HomeScreen';
import RecipeScreen from './RecipeScreen';
import ArticleScreen from './ArticleScreen';
import UserScreen from './UserScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: <MaterialCommunityIcons name="home" size={60} />
                }}
            />
        </Stack.Navigator>
    );
};

const RecipeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Recipe'
                component={RecipeScreen}
                options={{
                    title: <MaterialCommunityIcons name="bowl-mix" size={60} />
                }}
            />
        </Stack.Navigator>
    );
};

const ArticleNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Article'
                component={ArticleScreen}
                options={{
                    title: <MaterialCommunityIcons name="page-layout-body" size={60} />
                }}
            />
        </Stack.Navigator>
    );
};

const UserNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='User'
                component={UserScreen}
                options={{
                    title: <MaterialCommunityIcons name="chef-hat" size={60} />
                }}
            />
        </Stack.Navigator>
    );
};

const Main = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            barStyle={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name='Recipe'
                component={RecipeNavigator}
                options={{
                    tabBarLabel: 'Recipe',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="bowl-mix" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name='Article'
                component={ArticleNavigator}
                options={{
                    tabBarLabel: 'Article',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="page-layout-body" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name='User'
                component={UserNavigator}
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="chef-hat" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;