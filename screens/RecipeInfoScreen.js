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
import { toggleFavorite } from '../features/favorites/favoriteRecipesSlice';
import { postComment } from '../features/comments/commentsSlice';

const RecipeInfoScreen = ({ route, navigation }) => {
    console.log(route.params);
    const { recipe } = route.params;
    const favRecipes = useSelector((state) => state.favRecipes);
    const dispatch = useDispatch();

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

    return (
        <ScrollView>
            <View>
                <RenderRecipe
                    recipe={recipe}
                    // isFavorite={favRecipes.includes(recipe.name)}
                    markFavorite={() => dispatch(toggleFavorite(recipe.name))}
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