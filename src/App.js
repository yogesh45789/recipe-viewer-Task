/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { setRecipes, selectRecipe } from './features/recipes/recipesSlice';
import styles from './styles/App.module.css';
import { FaStar } from 'react-icons/fa';

const App = () => {
  const dispatch = useDispatch();
  const selectedRecipe = useSelector(state => state.recipes.selectedRecipe);
  const recipes = useSelector(state => state.recipes.recipes);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setRecipes(data.meals.map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal,
          instructions: meal.strInstructions,
          isFavorite: false,
        }))));
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
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

  const toggleShowFavorites = () => {
    setShowFavorites(prevShowFavorites => !prevShowFavorites);
  };

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <RecipeList selectRecipe={selectRecipeHandler} />
      </div>
      <div className={styles.main}>
        <button className={styles.favoriteButton} onClick={toggleShowFavorites}>
          <FaStar className={styles.starIcon} /> {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
        </button>
        {showFavorites ? (
          <div className={styles.favoriteList}>
            <h2 className={styles.subHeading}>Favorite Recipes</h2>
            <ul className={styles.cardList}>
              {recipes.filter(recipe => recipe.isFavorite).map(recipe => (
                <li key={recipe.id} className={styles.card} onClick={() => selectRecipeHandler(recipe.id)}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{recipe.name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {showRecipeDetail && selectedRecipe ? (
              <RecipeDetail goBack={goBack} />
            ) : (
              <div className={styles.placeholder}>Select a recipe to view details</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
