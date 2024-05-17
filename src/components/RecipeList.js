import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecipe } from '../features/recipes/recipesSlice';
import styles from '../styles/RecipeList.module.css';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

const RecipeList = () => {
  const recipes = useSelector(state => state.recipes.items);
  const dispatch = useDispatch();

  const onDragEnd = result => {
    // handle drag and drop logic
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="recipe-list">
        {(provided) => (
          <div
            className={styles.recipeList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {recipes.map((recipe, index) => (
              <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                {(provided) => (
                  <div
                    className={styles.recipeItem}
                    onClick={() => dispatch(selectRecipe(recipe.id))}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {recipe.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RecipeList;
