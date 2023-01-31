import { useState } from 'react';
import { ScrollView, Card, Text, View } from 'react-native';
import RenderRecipe from '../features/recipes/RenderRecipes';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const RecipeInfoScreen = ({ route }) => {
    const { recipe } = route.params;
    const favorite = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <RenderRecipe
                recipe={recipe}
                isFavorite={favorite.includes(recipe.name)}
                markFavorite={() => dispatch(toggleFavorite(recipe.name))}
            />
        </ScrollView>
    )
};

export default RecipeInfoScreen;