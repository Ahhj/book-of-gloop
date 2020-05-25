import React, { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import {
  AddItemButton,
  DeleteItemButton,
  DraggableListContainer,
  DraggableItemContainer,
} from "./style";

export default function EditableList({ items, onChange, EditableItem }) {
  const handleReorderItems = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      var reorderedItems = reorder(
        [...items],
        result.source.index,
        result.destination.index
      );
      onChange(reorderedItems);
    },
    [items, onChange]
  );

  const handleAddItem = useCallback(
    (e) => {
      var id = uuid();
      onChange([...items, { id }]);
    },
    [items, onChange]
  );

  const handleDeleteItem = useCallback(
    (id) => {
      var newItems = [...items].filter((item) => item.id !== id);
      onChange(newItems);
    },
    [items, onChange]
  );

  const handleEditItem = useCallback(
    (e, id) => {
      let newItems = items.map((item) => {
        let newItem = { ...item };
        if (newItem.id === id) {
          newItem[e.target.name] = e.target.value;
        }
        return newItem;
      });
      onChange(newItems);
    },
    [items, onChange]
  );

  return (
    <DragDropContext onDragEnd={handleReorderItems}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <DraggableListContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                isDragDisabled={false}
              >
                {(provided, snapshot) => (
                  <DraggableItemContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  >
                    {
                      <div>
                        <li>
                          <EditableItem
                            onChange={(e) => handleEditItem(e, item.id)}
                            item={item}
                          ></EditableItem>
                          <DeleteItemButton
                            onClick={() => handleDeleteItem(item.id)}
                            type="button"
                          >
                            -
                          </DeleteItemButton>
                        </li>
                      </div>
                    }
                  </DraggableItemContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DraggableListContainer>
        )}
      </Droppable>
      <AddItemButton onClick={handleAddItem} type="button">
        +
      </AddItemButton>
    </DragDropContext>
  );
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
