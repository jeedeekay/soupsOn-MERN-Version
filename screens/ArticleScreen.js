import {
    FlatList,
    Text,
    View
} from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
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
                    <Card
                        containerStyle={{
                            borderColor: '#ffe196',
                            borderWidth: 10,
                            borderRadius: 50,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            marginBottom: 5
                        }}
                    >
                        <Card.Title>
                            {article.name}
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