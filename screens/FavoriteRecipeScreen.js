import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const FavoriteRecipeScreen = ({ navigation }) => {
    const { recipesArray, isLoading, errMess } = useSelector(
        (state) => state.recipes
    );
    const favorites = useSelector((state) => state.favRecipes);
    const dispatch = useDispatch();

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
            data={recipesArray.filter((recipe) => 
                favorites.includes(recipe.name)
            )}
            renderItem={renderFavoriteRecipe}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default FavoriteRecipeScreen;