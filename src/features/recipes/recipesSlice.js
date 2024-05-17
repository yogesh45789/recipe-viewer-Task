import { createSlice } from '@reduxjs/toolkit';

const reorderArray = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    selectedRecipe: null,
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload;
    },
    selectRecipe(state, action) {
      state.selectedRecipe = state.recipes.find(recipe => recipe.id === action.payload);
    },
    toggleFavorite(state, action) {
      const recipe = state.recipes.find(recipe => recipe.id === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
      if (state.selectedRecipe && state.selectedRecipe.id === action.payload) {
        state.selectedRecipe.isFavorite = recipe.isFavorite;
      }
    },
    reorderRecipes(state, action) {
      state.recipes = reorderArray(state.recipes, action.payload.sourceIndex, action.payload.destinationIndex);
    },
    removeRecipe(state, action) {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter(recipe => recipe.id !== recipeId);
    },
  },
});

export const { setRecipes, selectRecipe, toggleFavorite, reorderRecipes, removeRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
