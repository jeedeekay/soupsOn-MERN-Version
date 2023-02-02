import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const FavoriteArticleScreen = ({ navigation }) => {
    const { articlesArray, isLoading, errMess } = useSelector(
        (state) => state.articles
    );
    const favorites = useSelector((state) => state.favArticles);
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
            data={articlesArray.filter((article) => 
                favorites.includes(article.title)
            )}
            renderItem={renderFavoriteArticle}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default FavoriteArticleScreen;