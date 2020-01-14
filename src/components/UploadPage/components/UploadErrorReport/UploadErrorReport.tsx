import React from "react";
import { ErrorReport, GetErrorReportKeys } from "../../../../models/FileReport";
import { ErrorLabels } from "../../../../util/Constants";

interface Props {
  errorReport: ErrorReport;
  filename: string;
  reportIndex: number;
}

const UploadErrorReport: React.FC<Props> = ({
  errorReport,
  filename,
  reportIndex
}) => {
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
          {GetErrorReportKeys(errorReport)
            .filter((errorKey: string) => errorKey !== "error_type")
            .map((errorKey, errorIndex: number) => (
              <div
                key={`upload-error-report-key-${filename}-${reportIndex}-${errorIndex}`}
                className="upload-error-report__error-row"
              >
                <div className="upload-error-report__error-label">
                  {ErrorLabels[errorKey]}:
                </div>
                <div className="upload-error-report__error-data">
                  {errorReport[errorKey].toString()}
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
