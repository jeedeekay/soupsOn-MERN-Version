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
        </Card>
    );
};

export default RenderArticle;