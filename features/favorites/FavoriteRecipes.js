import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';

const FavoriteRecipes = ({ navigation }) => {
    const { recipesArray } = useSelector(
        (state) => state.recipes
    );
    const favorites = useSelector((state) => state.favRecipes);

    const flatListArr = [];
    const favoriteDisplay = () => {
        for (let i = 0; i < 1; i++) {
            if (favorites[i]) {
                flatListArr.push(favorites[i]);
            }
        }
        console.log('DISPLAY: ', flatListArr);
    };
    favoriteDisplay();

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
            ListHeaderComponent={
                <Text
                    style={{
                        fontSize: 24,
                        marginLeft: 20
                    }}
                >Saved Recipes</Text>
            }
            ListHeaderComponentStyle={{
                backgroundColor: '#bbb',
                marginTop: 15
            }}
            data={recipesArray.filter((recipe) => 
                flatListArr.includes(recipe.name)
            )}
            renderItem={renderFavoriteRecipe}
            keyExtractor={(item) => item._id.toString()}
            ListFooterComponent={
                <Button
                    title='see all recipes'
                    onPress={() => navigation.navigate('FavoriteRecipe')}
                />
            }
        />
    );
};

export default FavoriteRecipes;