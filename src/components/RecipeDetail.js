import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecipe, toggleFavorite } from '../features/recipes/recipesSlice';
import styles from '../styles/RecipeDetail.module.css';
import { gsap } from 'gsap';
import { FaStar, FaArrowLeft } from 'react-icons/fa';

const RecipeDetail = ({ goBack }) => {
  const dispatch = useDispatch();
  const selectedRecipe = useSelector(state => state.recipes.selectedRecipe);

  React.useEffect(() => {
    gsap.fromTo('.recipeDetail', { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, [selectedRecipe]);

  if (!selectedRecipe) {
    return <div className={`${styles.recipeDetail} ${styles.noSelection}`}>Select a recipe to view details</div>;
  }

  return (
    <div className={`${styles.recipeDetail} recipeDetail`}>
      <button onClick={goBack} className={styles.backButton}><FaArrowLeft /> Back</button>
      <h2>{selectedRecipe.name}</h2>
      <button 
        className={`${styles.favoriteButton} ${selectedRecipe.isFavorite ? styles.favorited : ''}`}
        onClick={() => dispatch(toggleFavorite(selectedRecipe.id))}
      >
        <FaStar />
      </button>
      <p>{selectedRecipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
