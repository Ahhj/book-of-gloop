import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Thumb,
  ThumbInner,
  ThumbsContainer,
  ImagePreview,
  DropZoneContainer,
} from "./style";

export default function ImageDropZone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ImagePreview src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <div className="container">
      <DropZoneContainer>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
        <ThumbsContainer>{thumbs}</ThumbsContainer>
      </DropZoneContainer>
    </div>
  );
}
