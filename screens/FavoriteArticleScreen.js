import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

const FavoriteArticleScreen = ({ navigation }) => {
    const { articlesArray } = useSelector(
        (state) => state.articles
    );
    const favorites = useSelector((state) => state.favArticles);

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
                        <ListItem.Title>{article.name}</ListItem.Title>
                        <ListItem.Subtitle>{article.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }

    return (
        <FlatList
            data={articlesArray.filter((article) => 
                favorites.includes(article.name)
            )}
            renderItem={renderFavoriteArticle}
            keyExtractor={(item) => item._id.toString()}
        />
    );
};

export default FavoriteArticleScreen;