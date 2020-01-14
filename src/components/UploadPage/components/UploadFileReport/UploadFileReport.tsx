import React from "react";
import { ErrorReport } from "../../../../models/FileReport";
import { UploadErrorReport } from "../index";

interface Props {
  filename: string;
  errorReports: Array<ErrorReport>;
}

const UploadFileReport: React.FC<Props> = ({ filename, errorReports }) => {
  const [isOpen, setOpen] = React.useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="upload-file-report">
      <div className="upload-file-report__header" onClick={onToggle}>
        {filename}
        <i
          className={`upload-file-report__arrow whiteback ${
            isOpen ? "down" : "up"
          }`}
        />
      </div>
      <div className="upload-file-report__body">
        {isOpen
          ? errorReports.map((errorReport: ErrorReport, index: number) => (
              <UploadErrorReport
                key={`$error-report-${filename}-${index}`}
                errorReport={errorReport}
                filename={filename}
                reportIndex={index}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default UploadFileReport;
