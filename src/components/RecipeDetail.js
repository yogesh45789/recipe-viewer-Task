import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/RecipeDetail.module.css';
import { gsap } from 'gsap';

const RecipeDetail = () => {
  const selectedRecipe = useSelector(state => state.recipes.selectedRecipe);

  React.useEffect(() => {
    gsap.fromTo('.recipeDetail', { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, [selectedRecipe]);

  if (!selectedRecipe) {
    return <div className={styles.recipeDetail}>Select a recipe to view details</div>;
  }

  return (
    <div className={`${styles.recipeDetail} recipeDetail`}>
      <h2>{selectedRecipe.name}</h2>
      <p>{selectedRecipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
