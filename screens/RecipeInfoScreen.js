import { useState } from 'react';
import {
    ScrollView,
    Card,
    Text,
    View,
    Button,
    Modal,
    FlatList,
    StyleSheet
} from 'react-native';
import { Input, Rating } from 'react-native-elements';
import RenderRecipe from '../features/recipes/RenderRecipes';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavRecipes, toggleFavorite } from '../features/favorites/favoriteRecipesSlice';
import { postComment } from '../features/comments/commentsSlice';
import { toFav } from '../features/favorites/favoriteRecipesSlice';

const RecipeInfoScreen = ({ route, navigation }) => {
    console.log(route.params);
    const { recipe } = route.params;
    const favRecs = useSelector((state) => state.favRecipes.favRecArr);
    const dispatch = useDispatch();

    console.log('recipe info screen', favRecs);

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            recipeId: recipe._id
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };
    console.log('rec id', recipe._id);


    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        )
    }

    const favIds = (r) => {
        return favRecs.find((item) => item._id === r._id);
    }
    const favId = recipe._id;
    console.log('extracted id', favId);

    // dispatch(toggleFavorite({}));

    return (
        <ScrollView>
            <View>
                <RenderRecipe
                    recipe={recipe}
                    isFavorite={favId}
                    markFavorite={() => {
                        dispatch(toFav(recipe._id));
                        setTimeout(() => {
                            dispatch(fetchFavRecipes())
                        }, 5000);
                    }}
                    onShowModal={() => setShowModal(!showModal)}
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

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default RecipeInfoScreen;