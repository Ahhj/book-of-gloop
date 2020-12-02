import React, { useCallback } from "react";
import EditableList from "components/EditableList";
import { ListHeader, ListContainer } from "components/RecipeContainer/style";
import { TextArea, Form } from "./style";

export default function EditableSteps(props) {
  return (
    <ListContainer>
      <ol>
        <ListHeader>Steps</ListHeader>
        <EditableList
          onChange={props.onChange}
          items={props.items}
          EditableItem={EditableStepItem}
        >
          {" "}
        </EditableList>
      </ol>
    </ListContainer>
  );
}

function EditableStepItem({ item, onChange, onDelete }) {
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
      <TextArea {...getInputProps(item, "description")}></TextArea>
      <button onClick={onDelete} type="button">
        -
      </button>
    </Form>
  );
}
