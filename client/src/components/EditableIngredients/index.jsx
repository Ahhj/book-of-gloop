import React, { useCallback } from "react";
import EditableList from "components/EditableList";
import { ListHeader, ListContainer } from "../RecipeContainer/style";

export default function EditableIngredients(props) {
  return (
    <ListContainer>
      <ul>
        <ListHeader>Ingredients</ListHeader>
        <EditableList
          onChange={props.onChange}
          items={props.items}
          EditableItem={EditableIngredientItem}
        >
          {" "}
        </EditableList>
      </ul>
    </ListContainer>
  );
}

function EditableIngredientItem({ item, onChange }) {
  const getInputProps = useCallback(
    (item, field) => {
      return {
        type: "text",
        name: field,
        placeholder: `${field}`,
        defaultValue: item[field],
        onChange,
      };
    },
    [onChange]
  );
  return (
    <div>
      <input {...getInputProps(item, "quantity")}></input>
      <input {...getInputProps(item, "name")}></input>
    </div>
  );
}
