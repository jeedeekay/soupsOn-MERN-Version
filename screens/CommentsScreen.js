import {
    View,
    Text,
    Button,
    Modal,
    FlatList,
    StyleSheet } from 'react-native';
import { ListItem, Avatar, Input, Rating, Icon } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { useState } from 'react';
import { postComment, refreshRecipes } from '../features/recipes/recipesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const CommentsScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [newCom, setNewCom] = useState(0);
    const [comms, setNewComments] = useState(recipe.comments);
    const recID = recipe._id;
    console.log('page',recipe.comments);
    // const comments = useSelector((state) => {
    //     state.recipes.recipesArray.find((rec) => {
    //         if (rec._id === recipe._id) {
    //             console.log('rec', rec.comments);
    //             return rec.comments;
    //         }
    //     })
    // })
    // setNewComments(useSelector((state) =>
    //     state.recipes.recipesArray.filter((recipe) => {
    //         if (recipe._id === recID) {
    //             return recipe.comments;
    //         }
    //     })))
    const dispatch = useDispatch();

    console.log('comms',comms);

    useEffect(() => {
    },[])

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            recipeId: recipe._id
        };
        dispatch(postComment(newComment));
        const updatedComments = [...comms, newComment];
        console.log(updatedComments);
        setNewComments(updatedComments);
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
                data={comms}
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