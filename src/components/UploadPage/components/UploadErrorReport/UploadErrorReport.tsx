import React from "react";
import {
  ErrorReport,
  GetErrorReportKeys,
  ErrorFieldLabels,
  ErrorTypeLabels
} from "../../../../models/FileReport";
import UploadErrorRow from "./UploadErrorRow";

interface Props {
  errorReport: ErrorReport;
  filename: string;
  fileReportIndex: number;
}

const UploadErrorReport: React.FC<Props> = ({
  errorReport,
  filename,
  fileReportIndex
}) => {
  const [isOpen, setOpen] = React.useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  /**
   * The "unmatched_parens" type is explicit because of formatting against
   * the returned list. Elsewise, it's fine to dynamically run over it.
   * @param errorReport
   */
  const generateRow = (errorReport: ErrorReport) => {
    if (errorReport.error_type === "unmatched_parens") {
      return (
        <div
          className="upload-error-report__body 
          upload-error-report__body--unmatched_parens"
        >
          <UploadErrorRow
            label={ErrorFieldLabels.object_id}
            data={errorReport.object_id}
          />
          <UploadErrorRow
            label={ErrorFieldLabels.list_of_positions}
            data={errorReport.list_of_positions.join(", ")}
          />
          <UploadErrorRow
            label={ErrorFieldLabels.message}
            data={errorReport.message}
          />
        </div>
      );
    }

    return (
      <div
        className={`upload-error-report__body
        upload-error-report__body--${errorReport.error_type}`}
      >
        {GetErrorReportKeys(errorReport)
          .filter((key: string) => key !== "error_type")
          .map((reportKey, reportIndex) => (
            <UploadErrorRow
              key={`upload-error-report-key-${filename}-${fileReportIndex}-${reportIndex}`}
              label={ErrorFieldLabels[reportKey]}
              data={errorReport[reportKey]}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="upload-error-report">
      <div
        className={`upload-error-report__header 
        upload-error-report__header--${errorReport.error_type}
        ${isOpen ? "" : "upload-error-report__header--closed"}`}
        onClick={onToggle}
      >
        {ErrorTypeLabels[errorReport.error_type]}
        <i className={`upload-error-report__arrow ${isOpen ? "down" : "up"}`} />
      </div>
      {isOpen ? generateRow(errorReport) : ""}
    </div>
  );
};

export default UploadErrorReport;
