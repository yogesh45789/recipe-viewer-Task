import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/FavoriteRecipes.module.css';
import { toggleFavorite } from '../features/recipes/recipesSlice';

const FavoriteRecipes = () => {
  const favoriteRecipes = useSelector(state => state.recipes.items.filter(recipe => recipe.isFavorite));
  const dispatch = useDispatch();

  return (
    <div className={styles.favoriteRecipes}>
      {/* <h3>Favorite Recipes</h3> */}
      {favoriteRecipes.map(recipe => (
        <div key={recipe.id} className={styles.favoriteItem}>
          {recipe.name}
          <button onClick={() => dispatch(toggleFavorite(recipe.id))}>Unfavorite</button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
