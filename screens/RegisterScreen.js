import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card,CheckBox, Input, Button, Icon } from 'react-native-elements';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import FavoriteArticles from '../features/favorites/FavoriteArticles';
import * as SecureStore from 'expo-secure-store';
import { baseUrl } from '../shared/baseUrl';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [remember, setRemember] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleRegister = () => {
        const userInfo = {
            firstname,
            lastname,
            username,
            password
        };
        console.log(userInfo);
        fetch(baseUrl + 'users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
        });
        // console.log(JSON.stringify(userInfo));
        // if (remember) {
        //     SecureStore.setItemAsync(
        //         'userinfo',
        //         JSON.stringify({
        //             username,
        //             password
        //         })
        //     )
        //     .catch(
        //         (error) => console.log('Could not save user info', error)
        //     )
        // } else {
        //     SecureStore.deleteItemAsync('userinfo')
        //     .catch(
        //         (error) => console.log('Could not delete user info', error)
        //     )
        // }
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
            <View>
                <View style={styles.container}>
                    <Input
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(text) => setFirstName(text)}
                        value={firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(text) => setLastName(text)}
                        value={lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={remember}
                        onPress={() => setRemember(!remember)}
                        style={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => {
                                handleRegister();
                                navigation.navigate('Login');
                            }}
                            title='Register'
                            color='#5637DD'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{ marginRight: 10}}
                                />
                            }
                            buttonStyle={{ backgroundColor: '#5637DD' }}
                        />
                    </View>
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => navigation.navigate('Login')}
                            title='Cancel'
                        />
                    </View>
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 30,
        padding: 20,
        paddingBottom: 40,
        backgroundColor: 'white'
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        marginTop: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default RegisterScreen;