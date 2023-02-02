import { useState } from 'react';
import { ScrollView, Card, Text, View } from 'react-native';
import RenderRecipe from '../features/recipes/RenderRecipes';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoriteRecipesSlice';

const RecipeInfoScreen = ({ route }) => {
    const { recipe } = route.params;
    const favRecipes = useSelector((state) => state.favRecipes);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <RenderRecipe
                recipe={recipe}
                isFavorite={favRecipes.includes(recipe.name)}
                markFavorite={() => dispatch(toggleFavorite(recipe.name))}
            />
        </ScrollView>
    )
};

export default RecipeInfoScreen;