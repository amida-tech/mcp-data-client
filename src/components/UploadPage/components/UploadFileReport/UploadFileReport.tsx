import React from "react";
import { ErrorReport } from "../../../../models/FileReport";
import { UploadErrorReport } from "../index";

interface Props {
  filename: string;
  errorReports: Array<ErrorReport> | null;
}

const UploadFileReport: React.FC<Props> = ({ filename, errorReports }) => {
  const [isOpen, setOpen] = React.useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  const generateReport = (errorReports: Array<ErrorReport> | null) => {
    if (errorReports === null) {
      return (
        <div className="upload-file-report__success">No errors detected.</div>
      );
    }
    return errorReports.map((errorReport: ErrorReport, index: number) => (
      <UploadErrorReport
        key={`$error-report-${filename}-${index}`}
        errorReport={errorReport}
        filename={filename}
        fileReportIndex={index}
      />
    ));
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
        {isOpen ? generateReport(errorReports) : ""}
      </div>
    </div>
  );
};

export default UploadFileReport;
