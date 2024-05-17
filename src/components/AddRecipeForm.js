// AddRecipeForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../features/recipes/recipesSlice';

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  // Add state for other recipe details (e.g., ingredients, instructions)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add new recipe
    dispatch(addRecipe({ name: recipeName, /* other recipe details */ }));
    // Reset form fields
    setRecipeName('');
    // Reset other recipe detail fields
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="Enter recipe name"
      />
      {/* Add input fields for other recipe details */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
