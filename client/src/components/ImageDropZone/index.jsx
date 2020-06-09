import React from "react";
import { useDropzone } from "react-dropzone";
import {
  Thumb,
  ThumbInner,
  ThumbsContainer,
  ImagePreview,
  DropZoneContainer,
} from "./style";

export default function ImageDropZone({ image, onChange }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let file = acceptedFiles[0];
      readFileAsBase64(file).then(onChange);
    },
  });
  const thumb = (
    <Thumb key={"uploaded-thumb"}>
      <ThumbInner>{image ? <ImagePreview src={image} /> : null}</ThumbInner>
    </Thumb>
  );
  return (
    <div className="container">
      <DropZoneContainer>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
        <ThumbsContainer>{thumb}</ThumbsContainer>
      </DropZoneContainer>
    </div>
  );
}

function readFileAsBase64(file) {
  let reader = new FileReader();
  return new Promise(function(resolve, reject) {
    reader.onerror = () => {
      reader.abort();
      reject("Error reading file");
    };

    reader.onload = (event) => {
      let base64 = event.target.result;
      resolve(base64);
    };
    reader.readAsDataURL(file);
  });
}
