import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FeaturedItem = (props) => {
    const { item } = props;
    const recipes = useSelector((state) => state.recipes);

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Title
                    style={{ fontSize: 30, marginTop: 10 }}
                >
                    {
                        recipes.recipesArray.includes(item)
                            ? 'Soup du Jour'
                            : 'Trending Article'
                    }
                </Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + item.image }}/>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'black',
                                textAlign: 'center',
                                fontSize: 20,
                                marginLeft: 30,
                                marginRight: 30
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                <Text style={{ margin: 20, alignSelf: 'center' }}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />
};

const HomeScreen = ({ navigation }) => {
    const recipes = useSelector((state) => state.recipes);
    const articles = useSelector((state) => state.articles);
    
    const featRecipe = recipes.recipesArray.find((item) => item.featured);
    const featArticle = articles.articlesArray.find((item) => item.featured);

    return (
        <ScrollView>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('RecipeInfo', { recipe: featRecipe })
                }  
            >
                <FeaturedItem
                    item={featRecipe}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('ArticleInfo', { article: featArticle })}
            >
                <FeaturedItem
                    item={featArticle}
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default HomeScreen;