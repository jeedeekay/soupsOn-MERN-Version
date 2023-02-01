import { useRef } from 'react';
import { Text, View } from 'react-native-elements';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';

const RenderArticle = (props) => {
    const { article } = props;

    return (
        <Card>
            <Card.Title>
                {article.title}
            </Card.Title>
            <Text>
                {article.description}
            </Text>
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

export default RenderArticle;