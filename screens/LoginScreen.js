import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { baseUrl } from '../shared/baseUrl';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-native-paper';
import { loginCheck } from '../features/users.js/usersSlice';
import { setLoginStatus } from '../features/users.js/usersSlice';
import { logout } from '../features/users.js/usersSlice';
import { logged } from '../features/favorites/favoriteRecipesSlice';
import { fetchFavRecipes } from '../features/favorites/favoriteRecipesSlice';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [remember, setRemember] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = () => {
        const payload = {
            username,
            password
        };
        fetch(baseUrl + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        .then((response) => {
            const goodCreds = response.status;
            if (goodCreds === 200) {
                dispatch(setLoginStatus());
                dispatch(loginCheck());
                dispatch(logged(payload));
                dispatch(fetchFavRecipes());
                navigation.navigate('Content');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Content' }],
                  });
            } else {
                SecureStore.deleteItemAsync('userinfo')
                .catch(
                    (error) => console.log('Could not delete user info', error)
                )
            }
        })
    }

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
                setLoggedIn(true);
            }
        });
    }, []);
        return (
            <View
                style={{ top: 100 }}
            >
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user'}}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <Input
                    secureTextEntry={true}
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                />
                <View>
                    <Button
                        onPress={() => {
                                handleLogin();
                                setLoggedIn(!loggedIn);
                            }
                        }
                        title='Login'
                        color='#345666'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10}}
                            />
                        }
                        buttonStyle={{ backgroundColor: 'green' }}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => navigation.navigate('Register')}
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='tomato'
                                iconStyle={{ marginRight: 10}}
                            />
                        }
                        buttonStyle={{ color: 'tomato' }}
                    />
                </View>
            </View>
        );
};

export default LoginScreen;