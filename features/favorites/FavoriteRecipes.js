import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';

const FavoriteRecipes = ({ navigation }) => {
    const { recipesArray } = useSelector(
        (state) => state.recipes
    );
    // console.log('recipe list',recipesArray);
    // const { favRec } = useSelector((state) => state.favRecipes)
    const favorites = useSelector((state) => 
        state.favRecipes.favRecArr
    );
    // console.log('favorites',favorites);

    const favList = [];
    recipesArray.forEach((rec) => {
        for (let i = 0; i < 3; i++) {
            if (favorites[i] === rec._id) {
                favList.push(rec);
                // console.log(rec._id);
            }
        }
    });

    const renderFavoriteRecipe = ({ item: recipe }) => {
        return (
            <View>
                <ListItem
                    onPress={() => navigation.navigate('Recipe', {
                        scrren: 'RecipeInfo',
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
            data={favList}
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