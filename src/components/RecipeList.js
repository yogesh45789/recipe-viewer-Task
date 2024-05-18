import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { reorderRecipes } from '../features/recipes/recipesSlice';
import styles from '../styles/RecipeList.module.css';

const RecipeList = ({ selectRecipe }) => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    dispatch(reorderRecipes({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="recipe-list">
        {(provided) => (
          <div
            className={styles.recipeListContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className={styles.heading}>Recipe List</h2>
            <ul className={styles.list}>
              {recipes.map((recipe, index) => (
                <Draggable key={recipe.id} draggableId={recipe.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.listItem}
                      onClick={() => selectRecipe(recipe.id)}
                    >
                      {recipe.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RecipeList;

