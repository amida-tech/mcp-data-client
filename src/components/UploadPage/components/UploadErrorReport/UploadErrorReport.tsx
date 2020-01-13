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
          {Object.keys(errorReport).map(errorKey => (
            <div className="upload-error-report__error-row">
              <div className="upload-error-report__error-label">
                {errorKey.replace(/_/g, " ")}:
              </div>
              <div className="upload-error-report__error-data">
                {errorReport[errorKey]}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UploadErrorReport;
