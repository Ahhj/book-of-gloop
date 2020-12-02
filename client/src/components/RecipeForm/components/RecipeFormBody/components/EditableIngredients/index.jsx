import React, { useCallback } from "react";
import EditableList from "components/EditableList";
import { ListHeader, ListContainer } from "components/RecipeContainer/style";
import { NameInput, QuantityInput, Select, Form } from "./style";

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

function EditableIngredientItem({ item, onChange, onDelete }) {
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
    <Form>
      <QuantityInput {...getInputProps(item, "quantity")}></QuantityInput>
      <Select value={item.units} onChange={onChange}>
        <option value="grams">g</option>
        <option value="milliLitres">ml</option>
        <option value="tableSpoons">tbsp</option>
        <option value="teaSpoons">tsp</option>
        <option value="tableSpoons">tbsp</option>
        <option value="pinch">Pinch</option>
        <option value="dash">Dash</option>
      </Select>
      <NameInput {...getInputProps(item, "name")}></NameInput>
      <button onClick={onDelete} type="button">
        -
      </button>
    </Form>
  );
}
