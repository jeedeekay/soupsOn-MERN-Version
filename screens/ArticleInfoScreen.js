import { useState } from 'react';
import { ScrollView, Card, Text, View } from 'react-native';
import RenderArticle from '../features/articles/RenderArticles';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const ArticleInfoScreen = ({ route }) => {
    const { article } = route.params;
    const favorite = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <RenderArticle
                article={article}
                isFavorite={favorite.includes(article.title)}
                markFavorite={() => dispatch(toggleFavorite(article.title))}
            />
        </ScrollView>
    )
};

export default ArticleInfoScreen;