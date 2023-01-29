import { useState } from 'react';
import { ScrollView, Card, Text, View } from 'react-native';
import RenderArticle from '../features/articles/RenderArticles';
import { useSelector, useDispatch } from 'react-redux';

const ArticleInfoScreen = ({ route }) => {
    const { article } = route.params;
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <RenderArticle
                article={article}
            />
        </ScrollView>
    )
};

export default ArticleInfoScreen;