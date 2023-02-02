import { View, Text, FlatList, ScrollView } from 'react-native';
import { ListItem, Avatar, Icon, Card, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import FavoriteArticles from '../features/favorites/FavoriteArticles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserScreen = ({ navigation }) => {

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
                <FavoriteArticles navigation={navigation}/>
            </View>
        </View>
    );
};

export default UserScreen;