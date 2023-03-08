import HomeScreen from './HomeScreen';
import RecipeScreen from './RecipeScreen';
import ArticleScreen from './ArticleScreen';
import UserScreen from './UserScreen';
import RecipeInfoScreen from './RecipeInfoScreen';
import ArticleInfoScreen from './ArticleInfoScreen';
import FavoriteRecipeScreen from './FavoriteRecipeScreen';
import FavoriteArticleScreen from './FavoriteArticleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import { fetchRecipes } from '../features/recipes/recipesSlice';
import { fetchArticles } from '../features/articles/articlesSlice';
import { fetchComments } from '../features/comments/commentsSlice';
// import { loginUser } from '../features/users.js/usersSlice';

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
            <Stack.Screen
                name='RecipeInfo'
                component={RecipeInfoScreen}
                options={({ route }) => ({ title: route.params.recipe.name })}
            />
            <Stack.Screen
                name='ArticleInfo'
                component={ArticleInfoScreen}
                options={({ route }) => ({ title: route.params.article.name })}
            />
        </Stack.Navigator>
    );
};

const RecipeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Recipe'
                component={RecipeScreen}
                options={{
                    title: <Header />,
                    headerTitleAlign: 'center',
                    headerTitleStyle:{
                        padding: 10
                    }
                }}                   
            />
            <Stack.Screen
                name='RecipeInfo'
                component={RecipeInfoScreen}
                options={({ route }) => ({ title: route.params.recipe.name })}
            />
        </Stack.Navigator>
    );
};

const ArticleNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={screenOptions}
        >
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
            <Stack.Screen
                name='ArticleInfo'
                component={ArticleInfoScreen}
                options={({ route }) => ({ title: route.params.article.name })}
            />
        </Stack.Navigator>
    );
};

const UserNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
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
            <Stack.Screen
                name='FavoriteRecipe'
                component={FavoriteRecipeScreen}
                options={{
                    title: <Header />,
                    headerTitleAlign: 'center',
                    headerTitleStyle:{
                        padding: 10
                    }
                }}
            />
            <Stack.Screen
                name='FavoriteArticle'
                component={FavoriteArticleScreen}
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

const LoginNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    title: <Header />,
                    headerTitleAlign: 'center',
                    headerTitleStyle:{
                        padding: 10
                    }
                }}
            />
            <Stack.Screen
                name='Register'
                component={RegisterScreen}
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
    const [loggedIn, setLoggedIn] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRecipes());
        dispatch(fetchArticles());
        dispatch(fetchComments());
    }, [dispatch])

    const Tab = createMaterialBottomTabNavigator();
    const Stack = createStackNavigator();
    if (loggedIn) {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
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
    } else {
        return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name='Login' component={LoginNavigator} />
        </Stack.Navigator>
        );
    }
};

export default Main;