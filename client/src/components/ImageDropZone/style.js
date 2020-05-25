import styled from "styled-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const DropZoneContainer = styled.div`
  display: inline-block;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 0px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  width: 50%;
`;

export const ThumbsContainer = styled.aside`
  display: "flex";
  flexdirection: "row";
  flexwrap: "wrap";
  margintop: 16;
`;

export const Thumb = styled.div`
  display: "inline-flex";
  borderradius: 2;
  border: "1px solid #eaeaea";
  marginbottom: 8;
  marginright: 8;
  width: 100;
  height: 100;
  padding: 4;
  boxsizing: "border-box";
`;

export const ThumbInner = styled.div`
  display: "flex";
  minwidth: 0;
  overflow: "hidden";
`;

export const ImagePreview = styled.img`
  display: "inline-block";
  width: 200px;
  height: 200px;
`;
