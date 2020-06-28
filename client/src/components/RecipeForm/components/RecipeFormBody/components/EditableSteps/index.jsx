import React, { useCallback } from "react";
import EditableList from "components/EditableList";
import { ListHeader, ListContainer } from "components/RecipeContainer/style";

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

function EditableStepItem({ item, onChange }) {
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
  return <textarea {...getInputProps(item, "description")}></textarea>;
}
