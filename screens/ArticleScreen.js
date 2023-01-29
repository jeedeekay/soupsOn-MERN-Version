import {
    FlatList,
    Text,
    View
} from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/Loading';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ArticleScreen = ({ navigation }) => {
    const articles = useSelector((state) => state.articles);

    if (articles.isLoading) {
        return <Loading />
    }
    if (articles.errMess) {
        return (
            <View>
                <Text>{articles.errMess}</Text>
            </View>
        );
    }
    
    const renderArticleItem = ({ item: article }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ArticleInfo', { article })}
                >
                    <Card>
                        <Card.Title>
                            {article.title}
                        </Card.Title>
                        <Text>
                            {article.description}
                        </Text>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList 
            data={articles.articlesArray}
            renderItem={renderArticleItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default ArticleScreen;