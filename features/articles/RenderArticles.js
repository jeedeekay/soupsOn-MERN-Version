import { Card, Icon } from 'react-native-elements';
import { Text, View, Share } from 'react-native'
import { baseUrl } from '../../shared/baseUrl';

const RenderArticle = (props) => {
    const { article } = props;

    const shareArticle = ( title, message, url ) => {
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
        <Card>
            <Card.Image
                source={{ uri: baseUrl + article.image}}
                style={{ height: 250}}
            />
            <Card.Title
                style={{ fontSize: 30 }}
            >
                {article.name}
            </Card.Title>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'row'
                }}
            >
                {/* <Icon
                    name={props.isFavorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#e573ff'
                    raised
                    reverse
                    onPress={() => props.markFavorite()}
                /> */}
                <Icon
                    name='share'
                    type='font-awesome'
                    color='#34b1eb'
                    raised
                    reverse
                    onPress={() =>
                        shareArticle(
                            article.name,
                            article.description,
                            baseUrl + article.image
                        )
                    }
                />
            </View>
            <Text
                style={{ alignSelf: 'center', fontSize: 20 }}
            >
                {article.description}
            </Text>
            <Card.Divider 
                style={{ backgroundColor: 'white' }}
            />
            <Text>
                {article.content}
            </Text>
        </Card>
    );
};

export default RenderArticle;