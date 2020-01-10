import React from "react";
import { ErrorReport } from "../../../../models/FileReport";

interface Props {
  errorReport: ErrorReport;
}

const UploadErrorReport: React.FC<Props> = ({ errorReport }) => {
  const [isOpen, setOpen] = React.useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="upload-error-report">
      <div
        className={`upload-error-report__header ${
          isOpen ? "" : "upload-error-report__header--closed"
        }`}
        onClick={onToggle}
      >
        Error
        <i className={`upload-error-report__arrow ${isOpen ? "down" : "up"}`} />
      </div>
      {isOpen ? (
        <div className="upload-error-report__body">
          <div className="upload-error-report__label-column">
            <div className="upload-error-report__label-field">Column:</div>
            <div className="upload-error-report__label-field">Index:</div>
            <div className="upload-error-report__label-field">Excel:</div>
            <div className="upload-error-report__label-field">JSON:</div>
          </div>
          <div className="upload-error-report__data-column">
            <div className="upload-error-report__data-field">
              {errorReport.columnName}
            </div>
            <div className="upload-error-report__data-field">
              {errorReport.index}
            </div>
            <div className="upload-error-report__data-field">
              {errorReport.excel}
            </div>
            <div className="upload-error-report__data-field">
              {errorReport.json}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UploadErrorReport;
