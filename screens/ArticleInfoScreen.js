import { useState } from 'react';
import { ScrollView, Card, Text, View } from 'react-native';
import RenderArticle from '../features/articles/RenderArticles';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavArticle } from '../features/favorites/favoriteArticlesSlice';

const ArticleInfoScreen = ({ route }) => {
    const { article } = route.params;
    const favArticles = useSelector((state) => state.favArticles);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <RenderArticle
                article={article}
                isFavorite={favArticles.includes(article.title)}
                markFavorite={() => dispatch(toggleFavArticle(article.title))}
            />
        </ScrollView>
    )
};

export default ArticleInfoScreen;