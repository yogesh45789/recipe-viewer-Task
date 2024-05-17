import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import FavoriteRecipes from './components/FavoriteRecipes';
import { setRecipes } from './features/recipes/recipesSlice';
import styles from './styles/App.module.css';

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <div className={styles.app}>
      <RecipeList />
      <RecipeDetail />
      <FavoriteRecipes />
    </div>
  );
};

export default App;
