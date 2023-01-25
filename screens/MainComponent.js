import { View, Text } from 'react-native'
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
import Header from '../components/Header';

const screenOptions = {
    headerStyle: { backgroundColor: '#f5c242' }
}

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: <Header />,
                    headerTitleAlign: 'center',
                    headerTitleStyle:{
                        padding: 10,
                    }
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
                    header: () => (
                        <Header />
                    ),
                    headerTitleAlign: 'center',
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
                    title: <Header />,
                    headerTitleAlign: 'center',
                    headerTitleStyle:{
                        padding: 10
                    }
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
                    title: <Header />,
                    headerTitleAlign: 'center',
                    headerTitleStyle:{
                        padding: 10
                    }
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
            activeColor="#ed4907"
            barStyle={{ backgroundColor: '#f57542' }}
            labeled={false}
            inactiveColor='white'
        >
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name='Recipe'
                component={RecipeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="chef-hat" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name='Article'
                component={ArticleNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="book-open-page-variant" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name='User'
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;