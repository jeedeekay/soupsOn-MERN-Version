import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

const FavoriteArticles = ({ navigation }) => {
    const { articlesArray, isLoading, errMess } = useSelector(
        (state) => state.articles
    );
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const renderFavoriteArticle = ({ item: article }) => {
        return (
            <View>
                <ListItem
                    onPress={() => navigation.navigate({
                        name: 'ArticleInfo',
                        params: { article }
                    })}
                >
                    {/* <Avatar rounded source={{ uri: baseUrl + article.image }} /> */}
                    <ListItem.Content>
                        <ListItem.Title>{article.title}</ListItem.Title>
                        <ListItem.Subtitle>{article.description}</ListItem.Subtitle>
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
                >Saved Articles</Text>
            }
            ListHeaderComponentStyle={{
                backgroundColor: '#bbb',
                marginTop: 20
            }}
            data={articlesArray.filter((article) =>
                favorites.includes(article.title)
                )}
            renderItem={renderFavoriteArticle}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default FavoriteArticles;