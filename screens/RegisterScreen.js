import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card,CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { baseUrl } from '../shared/baseUrl';
import { useDispatch } from 'react-redux';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [remember, setRemember] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const dispatch = useDispatch();

    const handleRegister = () => {
        const userInfo = {
            firstname,
            lastname,
            username,
            password
        };
        fetch(baseUrl + 'users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
        });
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
                <View style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
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
                    <Input
                        placeholder='First Name'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={(text) => setFirstName(text)}
                        value={firstname}
                        
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={(text) => setLastName(text)}
                        value={lastname}
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
                            buttonStyle={{ backgroundColor: 'tomato', marginTop: 20 }}
                        />
                    </View>
                    <View>
                        <Button
                            onPress={() => navigation.navigate('Login')}
                            title='Cancel'
                            buttonStyle={{ backgroundColor: '#888', marginTop: 20 }}
                        />
                    </View>
                </View>
            </View>
        );
};

export default RegisterScreen;