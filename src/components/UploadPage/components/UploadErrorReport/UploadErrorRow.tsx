import React from "react";

interface Props {
  label: string;
  data: any;
}

/**
 * Tests are in UploadErrorReport.test.tsx
 */
const UploadErrorRow: React.FC<Props> = ({ label, data }) => {
  return (
    <div className="upload-error-report__error-row">
      <div className="upload-error-report__error-label">{label}:</div>
      <div className="upload-error-report__error-data">{data}</div>
    </div>
  );
};

export default UploadErrorRow;
