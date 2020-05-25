import styled from "styled-components";

export const AddItemButton = styled.button``;

export const DeleteItemButton = styled.button``;

export const DraggableListContainer = styled.div`
  padding: grid;
  width: "100%";
  background: ${(props) => (props.isDraggingOver ? "lightblue" : "white")};
`;

const grid = 8;

export const DraggableItemContainer = styled.div`
  userselect: "none";
  padding: ${grid * 2}px;
  margin: 0 0 ${grid}px 0;
  background: ${(props) => (props.isDragging ? "lightgreen" : "#CFD8DC")};
`;
