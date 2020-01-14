import React from "react";
import { dataService } from "../../services/data/DataService";
import { UploadFileReport } from "./components/";
import { FileReport } from "../../models/FileReport";

interface UploadPageState {
  loading: boolean;
  uploadNotice: string;
  message: string;
  fileReports: FileReport;
}

const UploadPage: React.FC = () => {
  const [uploadPageState, setUploadPageState] = React.useState<UploadPageState>(
    {
      loading: false,
      uploadNotice: "",
      message: "",
      fileReports: {
        fileNAME: [
          {
            error_type: "incorrect_value_in_row",
            message: "values suck",
            column_name: "fred",
            excel: "Nouincel",
            index: 5,
            json: "vorhees"
          },
          {
            error_type: "paren_error",
            character_index: 1,
            message: "'(' is not followed by a DBQ ID or '('",
            object_id: "whoppbopadoobobawhopbamboo.xlsx"
          }
        ],
        whatEVER: [
          {
            error_type: "incorrectly_formatted_dbq_id",
            formatted_dbq_id: "worz",
            message: "a witcher this way comes",
            object_id: "wordz"
          },
          {
            error_type: "no_dbq_logical_combo",
            message: "He's not well at all. :(",
            object_id: "inmydefenseiamnotwrong.json"
          },
          {
            error_type: "dbq_logical_combo_error",
            message: "lisa",
            index: 5,
            object_id: "fourty 2"
          }
        ],
        derp: [
          {
            error_type: "wrong_doc_type",
            message: "Things went bad."
          },
          {
            error_type: "unmatched_parens",
            object_id: "herp",
            list_of_positions: [5, 10, 24],
            message: "oh noes"
          }
        ]
      }
    }
  );

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const filename = event.target.files[0].name;
      setUploadPageState({
        loading: true,
        uploadNotice: "",
        message: "",
        fileReports: {}
      });
      dataService
        .postMultipartRequest({
          file: event.target.files[0],
          filename
        })
        .then(response => {
          if (response.status !== 200) {
            // A response of *any* kind is technically success.
            setUploadPageState({
              loading: false,
              uploadNotice:
                "Failed to upload. Something is wrong with the endpoint.",
              message: response.message,
              fileReports: {}
            });
            return;
          }
          setUploadPageState({
            loading: false,
            uploadNotice: "Upload success.",
            message: response.message,
            fileReports: response.fileReport
          });
        })
        .catch(() => {
          setUploadPageState({
            loading: false,
            uploadNotice: "Failed to upload due to connectivity issues.",
            message: "",
            fileReports: {}
          });
        });
    }
  };

  return (
    <div className="upload-page">
      <header className="upload-page__header">
        <div className="upload-page__title">Upload Page</div>
      </header>
      <form className="upload-page__export-form">
        <span className="upload-page__file-instructions">Select file:</span>
        <input
          className="upload-page__file-input"
          onChange={onUploadFile}
          type="file"
          multiple
        />
      </form>
      {uploadPageState.loading ? (
        <div className="upload-page__load-indicator">Uploading...</div>
      ) : (
        ""
      )}
      <div className="upload-page__upload-notice">
        {uploadPageState.uploadNotice}
      </div>
      <div className="upload-page__file-report">
        <span className="upload-page__message">{uploadPageState.message}</span>
        <div className="upload-page__file-breakdown">
          {Object.keys(uploadPageState.fileReports).map(
            (reportKey: string, index: number) => (
              <div
                className="upload-page__error-panel"
                key={`upload-page__file-report-${index}`}
              >
                <UploadFileReport
                  filename={reportKey}
                  errorReports={uploadPageState.fileReports[reportKey]}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
