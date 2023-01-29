import { useState } from 'react';
import { ScrollView, Card, Text, View } from 'react-native';
import RenderRecipe from '../features/recipes/RenderRecipes';
import { useSelector, useDispatch } from 'react-redux';

const RecipeInfoScreen = ({ route }) => {
    const { recipe } = route.params;
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <RenderRecipe
                recipe={recipe}
            />
        </ScrollView>
    )
};

export default RecipeInfoScreen;