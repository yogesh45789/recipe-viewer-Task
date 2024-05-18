import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/RecipeList.module.css';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

const RecipeList = ({ selectRecipe }) => {
  const recipes = useSelector(state => state.recipes.items);

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
                    onClick={() => selectRecipe(recipe.id)}
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
