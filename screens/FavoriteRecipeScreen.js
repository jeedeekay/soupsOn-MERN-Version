import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const FavoriteRecipeScreen = ({ navigation }) => {
    const { recipesArray } = useSelector(
        (state) => state.recipes
    );
    console.log('recipe list',recipesArray);
    // const { favRec } = useSelector((state) => state.favRecipes)
    const favorites = useSelector((state) => 
        state.favRecipes.favRecArr
    );
    console.log('favorites',favorites);

    const favList = [];
    recipesArray.forEach((rec) => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]._id === rec._id) {
                favList.push(rec);
                console.log(rec._id);
            }
        }
    });

    const renderFavoriteRecipe = ({ item: recipe }) => {
        return (
            <View>
                <ListItem
                    onPress={() => navigation.navigate({
                        name: 'RecipeInfo',
                        params: { recipe }
                    })}
                >
                    <Avatar rounded source={{ uri: baseUrl + recipe.image }} />
                    <ListItem.Content>
                        <ListItem.Title>{recipe.name}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }

    return (
        <FlatList
            data={favList}
            renderItem={renderFavoriteRecipe}
            keyExtractor={(item) => item._id.toString()}
        />
    );
};

export default FavoriteRecipeScreen;