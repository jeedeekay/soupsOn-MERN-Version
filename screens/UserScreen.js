import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import FavoriteRecipes from '../features/favorites/FavoriteRecipes';
import FavoriteArticles from '../features/favorites/FavoriteArticles';

const UserScreen = ({ navigation }) => {
    const { recipesArray, isLoading, errMess } = useSelector(
        (state) => state.recipes
    );
    const favorites = useSelector((state) => state.favorites);

    return (
        <View>
            <FavoriteRecipes navigation={navigation}/>
            <FavoriteArticles navigation={navigation}/>
        </View>
    );
};

export default UserScreen;