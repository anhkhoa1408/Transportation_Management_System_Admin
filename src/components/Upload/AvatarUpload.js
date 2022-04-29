import { useDropzone } from "react-dropzone";
import { Button, Card } from "reactstrap";
import React, { useState, useEffect } from "react";
import { Edit } from "@mui/icons-material";
import "./../../assets/css/components/AvatarUpload.css";

export default function AvatarUpload({ avatar, setAvatar }) {
  const [file, setFile] = useState(null);
  const { isDragActive, open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAvatar &&
        setAvatar(
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
    <div className="rounded-circle shadow me-4">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="rounded-circle position-relative">
          <Button
            onClick={open}
            className="rounded-circle app-bg--primary badge badge-style badge-position shadow-sm text-white hover-sm"
          >
            <Edit className="text-white" fontSize="small" />
          </Button>

          {!isDragActive && !file && (
            <div className="d-100 img-cropper">
              <img
                className="img-fit-container hover-sm"
                src={
                  avatar ||
                  "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                }
                alt=""
              />
            </div>
          )}

          {file && (
            <div key={file.name} className="d-100 img-cropper">
              <img
                className="img-fit-container hover-sm"
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
