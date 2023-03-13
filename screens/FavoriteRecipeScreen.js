import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { useEffect } from 'react';
import { fetchFavRecipes } from '../features/favorites/favoriteRecipesSlice';

const FavoriteRecipeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavRecipes());
    }, []);

    const { recipesArray } = useSelector(
        (state) => state.recipes
    );
    const favorites = useSelector((state) => 
        state.favRecipes.favRecArr
    );  
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
                    onPress={() => navigation.navigate('Recipe',{
                        screen: 'RecipeInfo',
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