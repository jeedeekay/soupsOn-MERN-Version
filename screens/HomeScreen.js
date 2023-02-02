import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const HomeScreen = ({ navigation }) => {
    const { recipesArray, isLoading, errMess } = useSelector(
        (state) => state.recipes
    );

    const FeaturedSoup = () => {
        const featuredRecipe = () => recipesArray.find((recipe) => recipe.featured === true);
        console.log(featuredRecipe);
        
        return (
            <Card
            >
                <Card.Title
                    style={{
                        fontSize: 30
                    }}
                >
                    Soup du Jour
                </Card.Title>
                <Card.Image
                    style={{
                        height: 300
                    }}
                />
            </Card>
        )
    }

    return (
        <ScrollView>
            <FeaturedSoup />
        </ScrollView>
    );
};

export default HomeScreen;