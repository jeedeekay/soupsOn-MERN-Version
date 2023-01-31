import { useRef } from 'react';
import { Text, View } from 'react-native-elements';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';

const RenderRecipe = (props) => {
    const { recipe } = props;

    return (
        <Card>
            <Card.Image source={{ uri: baseUrl + recipe.image }} />
            <Card.Title>
                {recipe.name}
            </Card.Title>
            <Icon
                name={props.isFavorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                raised
                reverse
                onPress={() => props.markFavorite()}
            />
        </Card>
    );
};

export default RenderRecipe;