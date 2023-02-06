import { View, Text, ScrollView } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import FavoriteArticles from '../features/favorites/FavoriteArticles';

const UserScreen = ({ navigation }) => {

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
            </View>
            
            <View>
                <FavoriteRecipes navigation={navigation}/>
                <FavoriteArticles navigation={navigation}/>
            </View>
        </ScrollView>
    );
};

export default UserScreen;