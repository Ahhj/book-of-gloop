import React from "react";
import EditableList from "../components/EditableList";

export default {
  title: "EditableList",
};

const items = [
  {
    id: "value",
  },
];

const onEdit = (items) => {
  console.log(items);
};

export const Default = () => (
  <EditableList items={items} onEdit={onEdit} EditableItem={() => <input />} />
);
