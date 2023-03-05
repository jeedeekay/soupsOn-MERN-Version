import {
    FlatList,
    Text,
    View
} from 'react-native';
import { Tile } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/Loading';

const RecipeScreen = ({ navigation }) => {
    const recipes = useSelector((state) => state.recipes);

    if (recipes.isLoading) {
        return <Loading />
    }
    if (recipes.errMess) {
        return (
            <View>
                <Text>{recipes.errMess}</Text>
            </View>
        );
    }
    
    const renderRecipeItem = ({ item: recipe }) => {
        return (
            <View>
                <Tile
                    title={recipe.name}
                    imageSrc={{ uri: baseUrl + recipe.image }}
                    featured
                    titleStyle={{ padding: 10, borderRadius: 50, backgroundColor: (100) }}
                    containerStyle={{ padding: 0, margin: 0}}
                    onPress={() => navigation.navigate('RecipeInfo', { recipe })}
                />
            </View>
        );
    };

    return (
        <FlatList 
            data={recipes.recipesArray}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item._id.toString()}
        />
    );
};

export default RecipeScreen;