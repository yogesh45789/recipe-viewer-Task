import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/RecipeList.module.css';

const RecipeList = ({ selectRecipe }) => {
  const recipes = useSelector(state => state.recipes.recipes);

  return (
    <div className={styles.recipeListContainer}>
      <h2 className={styles.heading}>Recipe List</h2>
      <ul className={styles.list}>
        {recipes.map(recipe => (
          <li key={recipe.id} className={styles.listItem} onClick={() => selectRecipe(recipe.id)}>
            {recipe.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
