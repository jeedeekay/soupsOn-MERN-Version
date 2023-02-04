import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

const FavoriteArticles = ({ navigation }) => {
    const { articlesArray, isLoading, errMess } = useSelector(
        (state) => state.articles
    );
    const favorites = useSelector((state) => state.favArticles);
    const dispatch = useDispatch();
    const flatListArr = [];
    const favoriteDisplay = () => {
        for (let i = 0; i < 3; i++) {
            if (favorites[i]) {
                flatListArr.push(favorites[i]);
            }
        }
        console.log('DISPLAY: ', flatListArr);
    };
    favoriteDisplay();

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
                        <ListItem.Title>{article.name}</ListItem.Title>
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
                flatListArr.includes(article.name)
                )}
            renderItem={renderFavoriteArticle}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={
                <Button
                    title='see all articles'
                    onPress={() => navigation.navigate('FavoriteArticle')}
                />
            }
        />
    );
};

export default FavoriteArticles;