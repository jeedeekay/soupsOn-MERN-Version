import { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { Avatar, Card, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import { logout } from '../features/users.js/usersSlice';

const UserScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

        return (
            <View>
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
                </View>
                
                <View>
                    <FavoriteRecipes navigation={navigation}/>
                    {/* <FavoriteArticles navigation={navigation}/> */}
                </View>
                <View>
                    <Button
                        title='Logout' 
                        onPress={() => setShowModal(!showModal)}
                        buttonStyle={{backgroundColor: 'red', marginTop: 30}}
                />
                </View>
                <Modal
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => setShowModal(!setShowModal)}
                >
                    <View
                        style={{ alignItems: 'center', marginTop: 100}}
                    >
                        <Text>Are you sure you want to log out?</Text>
                        <Button
                            title='Logout' 
                            onPress={() => {
                                dispatch(logout());
                                navigation.navigate('Login');
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login' }],
                                });
                            }}
                            buttonStyle={{backgroundColor: 'red', marginTop: 20}}
                        />
                        <Button
                            title='Cancel'
                            onPress={() => setShowModal(!showModal)}
                            buttonStyle={{ marginTop: 10}}
                        />
                    </View>
                </Modal>
            </View>
        );
};

export default UserScreen;