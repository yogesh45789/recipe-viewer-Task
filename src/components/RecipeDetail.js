import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/recipes/recipesSlice';
import styles from '../styles/RecipeDetail.module.css';
import { FaStar } from 'react-icons/fa';

const RecipeDetail = ({ goBack }) => {
  const dispatch = useDispatch();
  const selectedRecipe = useSelector(state => state.recipes.selectedRecipe);

  if (!selectedRecipe) {
    return <div className={styles.noSelection}>Select a recipe to view details</div>;
  }

  return (
    <div className={styles.recipeDetailContainer}>
      <div className={styles.recipeDetailCard}>
        <div className={styles.header}>
          <h2 className={styles.recipeTitle}>{selectedRecipe.name}</h2>
          <FaStar 
            className={`${styles.favoriteIcon} ${selectedRecipe.isFavorite ? styles.favorited : ''}`}
            onClick={() => dispatch(toggleFavorite(selectedRecipe.id))}
          />
        </div>
        <p className={styles.recipeInstructions}>{selectedRecipe.instructions}</p>
      </div>
      <button onClick={goBack} className={styles.backButton}>Back</button>
    </div>
  );
};

export default RecipeDetail;
