import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedRecipe: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, action) {
      state.items = action.payload;
    },
    selectRecipe(state, action) {
      state.selectedRecipe = state.items.find(recipe => recipe.id === action.payload);
    },
    toggleFavorite(state, action) {
      const recipe = state.items.find(recipe => recipe.id === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
    },
  },
});

export const { setRecipes, selectRecipe, toggleFavorite } = recipesSlice.actions;
export default recipesSlice.reducer;
