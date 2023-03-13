import { ScrollView, View, Button } from 'react-native';
import RenderRecipe from '../features/recipes/RenderRecipes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavRecipes, fave } from '../features/favorites/favoriteRecipesSlice';

const RecipeInfoScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <View>
                <RenderRecipe
                    recipe={recipe}
                    isFavorite={useSelector((state) => state.favRecipes.favRecArr.find((fav) => {
                        if (fav._id === recipe._id) {
                            return fav._id;
                        }
                    }))}
                    markFavorite={() => {
                        dispatch(fave(recipe._id));
                        setTimeout(() => {
                            dispatch(fetchFavRecipes())
                        }, 500);
                    }}
                />
            </View>
            <Button
                title='Comments'
                onPress={() => navigation.navigate({
                    name: 'Comments',
                    params: { recipe }
                })}
            />
        </ScrollView>
    )
};

export default RecipeInfoScreen;