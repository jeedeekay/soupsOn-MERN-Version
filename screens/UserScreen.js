import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card,CheckBox, Input, Button, Icon } from 'react-native-elements';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import FavoriteArticles from '../features/favorites/FavoriteArticles';
import * as SecureStore from 'expo-secure-store';
import { baseUrl } from '../shared/baseUrl';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-native-paper';
import { logout, loginCheck } from '../features/users.js/usersSlice';

const UserScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [remember, setRemember] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = () => {
        // console.log('username:', username);
        // console.log('password:', password);
        // console.log('remember:', remember);
        // const payload = {
        //     username,
        //     password
        // };
        // fetch(baseUrl + 'users/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload),
        // });
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

    const handleRegister = () => {
        const userInfo = {
            username,
            password,
            firstName,
            lastName,
            remember
        };
        console.log(JSON.stringify(userInfo));
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            )
            .catch(
                (error) => console.log('Could not save user info', error)
            )
        } else {
            SecureStore.deleteItemAsync('userinfo')
            .catch(
                (error) => console.log('Could not delete user info', error)
            )
        }
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
            <ScrollView>
                <View>
                    <Card
                        containerStyle={{ marginBottom: 20 }}
                    >
                        <Avatar
                            size='large'
                            rounded
                            icon={{ name: 'user', type: 'font-awesome'}}
                            iconStyle={{ color: 'black' }}
                            containerStyle={{ backgroundColor: '#ccc', borderColor: '#999', borderWidth: 1, margin: 10, alignSelf: 'center' }}
                        />
                        <Card.Title>Username</Card.Title>
                        <Text
                            style={{ justifyContent: 'center', alignSelf:'center' }}
                        >
                            The user profile goes here. Users can add a bio about themselves and talk about their soup mission.
                        </Text>
                    </Card>
                    <Button onPress={() => {
                        dispatch(logout());
                        dispatch(loginCheck());
                        navigation.navigate('Login');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                          });
                    }}
                    >
                        </Button>
                </View>
                
                <View>
                    <FavoriteRecipes navigation={navigation}/>
                    <FavoriteArticles navigation={navigation}/>
                </View>
            </ScrollView>
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

export default UserScreen;