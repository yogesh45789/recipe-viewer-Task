// RecipeViewer.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipe } from '../features/recipes/recipesSlice';
import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';

const RecipeViewer = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const [defaultRecipeId, setDefaultRecipeId] = useState(null);

  useEffect(() => {
    // Set the default recipe ID
    if (recipes.length > 0 && !defaultRecipeId) {
      setDefaultRecipeId(recipes[0].id);
    }
  }, [recipes, defaultRecipeId]);

  useEffect(() => {
    // Select the default recipe when the component mounts
    if (defaultRecipeId) {
      dispatch(selectRecipe(defaultRecipeId));
    }
  }, [dispatch, defaultRecipeId]);

  return (
    <div className="recipe-viewer-container">
      <RecipeList />
      <RecipeDetail />
    </div>
  );
};

export default RecipeViewer;
