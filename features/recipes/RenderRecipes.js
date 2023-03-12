import { Text, View, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';

const RenderRecipe = (props) => {
    const { recipe } = props;

    const shareRecipe = ( title, message, url ) => {
        Share.share(
            {
                title,
                message: `${title}: ${message} ${url}`,
                url
            },
            {
                dialogTitle: 'Share ' + title
            }
        )
    }

    return (
        <Card
            containerStyle={{ marginBottom: 20 }}
        >
            <Card.Image
                 source={{ uri: baseUrl + recipe.image }}
                 style={{ height: 300 }}
            />
            <Card.Title
                style={{ fontSize: 30 }}
            >
                {recipe.name}
            </Card.Title>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'row'
                }}
            >
                <Icon
                    name={props.isFavorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#e573ff'
                    raised
                    reverse
                    onPress={() => props.markFavorite()}
                />
                <Icon
                    name='share'
                    type='font-awesome'
                    color='#34b1eb'
                    raised
                    reverse
                    onPress={() =>
                        shareRecipe(
                            recipe.name,
                            recipe.description,
                            baseUrl + recipe.image
                        )
                    }
                />
            </View>
            <Text>
                {recipe.description}
            </Text>
        </Card>
    );
};

export default RenderRecipe;