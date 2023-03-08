import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card,CheckBox, Input, Button, Icon } from 'react-native-elements';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import FavoriteArticles from '../features/favorites/FavoriteArticles';
import * as SecureStore from 'expo-secure-store';
import { baseUrl } from '../shared/baseUrl';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-native-paper';

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
        console.log('username:', username);
        console.log('password:', password);
        console.log('remember:', remember);
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

    if (loggedIn) {
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
                    <Button onPress={() => dispatch(SecureStore.deleteItemAsync('userinfo'))}>
                        </Button>
                </View>
                
                <View>
                    <FavoriteRecipes navigation={navigation}/>
                    <FavoriteArticles navigation={navigation}/>
                </View>
            </ScrollView>
        );
    } else {
        return (
            <View>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <Input
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
                        onPress={() => handleLogin()}
                        title='Login'
                        color='#5637DD'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10}}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => setShowModal(!showModal)}
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='blue'
                                iconStyle={{ marginRight: 10}}
                            />
                        }
                        buttonStyle={{ color: 'blue' }}
                    />
                </View>
                <Modal
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => setShowModal(!showModal)}
                >
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
                                value={firstName}
                                containerStyle={styles.formInput}
                                leftIconContainerStyle={styles.formIcon}
                            />
                            <Input
                                placeholder='Last Name'
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                onChangeText={(text) => setLastName(text)}
                                value={lastName}
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
                                        setShowModal(!setShowModal);
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
                                    onPress={() => setShowModal(!setShowModal)}
                                    title='Cancel'
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
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