import {
    View,
    Text,
    Button,
    Modal,
    FlatList,
    StyleSheet } from 'react-native';
import { Input, Rating, Icon } from 'react-native-elements';
import { useState } from 'react';
import { postComment, fetchRecipes } from '../features/recipes/recipesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const CommentsScreen = ({ route }) => {
    const { recipe } = route.params;
    const comments = useSelector(state => state.recipes.recipesArray[
        state.recipes.recipesArray.indexOf(state.recipes.recipesArray.find(
            (rec) => rec._id === recipe._id))].comments);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipes());
    },[])

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            recipeId: recipe._id
        };
        dispatch(postComment(newComment));
        setTimeout(() => {
            dispatch(fetchRecipes())
        }, 500);
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
        <View>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListFooterComponent={
                    <Icon
                    name='pencil'
                    type='font-awesome'
                    color='#f5c242'
                    raised
                    reverse
                    onPress={() => setShowModal(!showModal)}
                />
                }
                
            />
            <Modal
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!setShowModal)}
            >
                <View
                    style={styles.modal}
                >
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Leave comments here'
                        leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                    />
                    <View
                        style={{ margin: 10 }}
                    >
                        <Button
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
                    </View>
                    <View
                        style={{ margin: 10 }}
                    >
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </View>
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

export default CommentsScreen;