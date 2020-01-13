import React from "react";
import { ErrorReport, GetErrorReportKeys } from "../../../../models/FileReport";

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
          {GetErrorReportKeys(errorReport).map(errorKey => (
            <div>
              <span className="upload-error-report__label-field">
                {errorKey.replace(/_/g, " ")}:
              </span>
              {errorReport[errorKey]}
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
