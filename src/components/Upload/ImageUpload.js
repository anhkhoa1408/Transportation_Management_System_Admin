import { useDropzone } from "react-dropzone";
import { Button, Card } from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import { Close, Edit } from "@mui/icons-material";
import "./../../assets/css/components/ImageUpload.css";

export default function ImageUpload({ image, setImage }) {
  const [file, setFile] = useState(null);
  const ref = useRef(null);
  const { open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage &&
        setImage(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          }),
        );
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      );
    },
  });

  return (
    <div className="d-flex flex-row align-items-center justify-content-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          id="drop-zone"
          className="position-relative"
          ref={ref}
          onClick={!image ? open : null}
        >
          {image && (
            <Button
              onClick={(e) => {
                setImage(null);
                setFile(null);
                e.stopPropagation();
              }}
              className="rounded-circle bg-danger badge close-style close-position shadow-sm text-white hover-sm"
            >
              <Close sx={{ fontSize: 15 }} className="text-white" />
            </Button>
          )}

          {!file && (
            <div className="d-100 img-cropper__dashed rounded-sm">
              <img
                className="img-fit-container rounded-sm hover-sm"
                src={
                  image ||
                  "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                }
                alt=""
              />
            </div>
          )}

          {file && (
            <div
              key={file.name}
              className="d-100 img-cropper__dashed rounded-sm"
            >
              <img
                className="img-fit-container rounded-sm hover-sm"
                src={file.preview}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
