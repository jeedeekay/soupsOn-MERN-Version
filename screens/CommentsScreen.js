import {
    View,
    Text,
    Button,
    Modal,
    FlatList,
    StyleSheet } from 'react-native';
import { ListItem, Avatar, Input, Rating } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { useState } from 'react';
import { postComment } from '../features/comments/commentsSlice';
import { useSelector, useDispatch } from 'react-redux';

const CommentsScreen = ({ route }) => {
    const { recipe } = route.params;
    const comments = useSelector((state) => state.comments);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

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
                data={comments.commentsArray.filter(
                    (comment) => comment.recipeId === recipe._id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                
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
                        placeholder='Name'
                        leftIcon={{ name: 'user-o', type: 'font-awesome' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(author) => setAuthor(author)}
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