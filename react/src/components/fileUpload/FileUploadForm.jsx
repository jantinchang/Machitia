import React from "react";
import { useDropzone } from "react-dropzone";
import { add } from "./../../services/fileUploadService";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import logger from "sabio-debug";

const _logger = logger.extend("FileUploadForm");

const FileUpload = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    multiple: props.isMultiple,
    maxSize: 10000000,
    accept: props.mimeString,
    onDrop: (acceptedFiles, rejectedFiles) => {
      _logger(
        acceptedFiles,
        "File was accepted",
        rejectedFiles,
        "files rejected"
      );
      if (props.isMultiple) {
        if (acceptedFiles > props.maxUpload) {
          toast.error(`Too Many Files! Only ${props.maxUpload} files allowed`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          acceptedFiles.length = props.maxUpload;
        }
        if (rejectedFiles.length > 0) {
          toast.error(`Too Many Files! Only ${props.maxUpload} files allowed`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          rejectedFiles.length = 0;
        }
      }
      if (acceptedFiles.length) {
        submitFiles(acceptedFiles);
      }
    },
  });

  const submitFiles = (files) => {
    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      formData.append(`file${index}`, files[index], files[index].name);
    }
    add(formData).then(onFileUploadSuccess).catch(onFileUploadError);
  };

  const onFileUploadSuccess = (response) => {
    props.onUploadSuccess(response.items);
    _logger(response, "Upload Success");
    toast.success("Upload Success", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onFileUploadError = (err) => {
    _logger(err, "Upload Failed");
    toast.error("Upload Failed", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="upload-container col-3">
      <div
        {...getRootProps({
          className: `dropzone ${isDragActive && `upload-success`} ${
            isDragReject && `upload-failure`
          }`,
        })}
      >
        <span>
          <input {...getInputProps()} />
          <i className="fa fa-cloud-upload"></i>
          {isDragReject && "File type not accepted, sorry!"}
        </span>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  maxUpload: PropTypes.number,
  awsUrls: PropTypes.func.isRequired,
  mimeString: PropTypes.string,
  index: PropTypes.number,
};

FileUpload.defaultProps = {
  isMultiple: true,
  maxUpload: 4,
  mimeString: "image/*",
  awsUrls: () => {
    _logger(
      "Missing awsUrl Function as props! This is needed to receive the list of URLs in the Parent component"
    );
  },
};

export default FileUpload;
