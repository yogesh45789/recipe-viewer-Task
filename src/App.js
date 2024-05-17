import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import FavoriteRecipes from './components/FavoriteRecipes';
import { setRecipes, selectRecipe } from './features/recipes/recipesSlice';
import styles from './styles/App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const selectedRecipe = useSelector(state => state.recipes.selectedRecipe);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      dispatch(setRecipes(data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        instructions: meal.strInstructions,
        isFavorite: false,
      }))));
    };

    fetchRecipes();
  }, [dispatch]);

  const goBack = () => {
    setShowRecipeDetail(false);
  };

  const selectRecipeHandler = (recipeId) => {
    dispatch(selectRecipe(recipeId));
    setShowRecipeDetail(true);
  };

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        {!showRecipeDetail || !selectedRecipe ? (
          <RecipeList selectRecipe={selectRecipeHandler} />
        ) : (
          <RecipeDetail goBack={goBack} />
        )}
      </div>
      <FavoriteRecipes />
    </div>
  );
};

export default App;
