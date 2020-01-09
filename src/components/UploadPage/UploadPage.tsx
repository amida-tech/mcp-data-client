import React from "react";
import { dataService } from "../../services/data/DataService";
import { UploadFileReport } from "./components/";
import { FileReport } from "../../models/FileReport";

type Props = {};

interface State {
  loading: Boolean;
  uploadNotice: string;
  message: string;
  fileReports: FileReport;
}

class UploadPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      uploadNotice: "",
      message: "",
      fileReports: {
        fileNAME: [
          {
            columnName: "fred",
            index: 5,
            excel: "No ur an incel",
            json: "vorhees"
          },
          {
            columnName: "steve",
            index: 5,
            excel: "No ur an incel",
            json: "vorhees"
          },
          {
            columnName: "martin",
            index: 6,
            excel: "No ur an incel",
            json: "vorhees"
          }
        ]
      }
    };
    this.onUploadFile = this.onUploadFile.bind(this);
  }

  onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const filename = event.target.files[0].name;
      this.setState({ loading: true, uploadNotice: "", message: "" });
      dataService
        .postMultipartRequest({
          file: event.target.files[0],
          filename
        })
        .then(response => {
          if (response.status !== 200) {
            // A response of *any* kind is technically success.
            this.setState({
              loading: false,
              uploadNotice:
                "Failed to upload. Something is wrong with the endpoint.",
              message: response.message,
              fileReports: {}
            });
            return;
          }
          this.setState({
            loading: false,
            uploadNotice: "Upload success.",
            message: response.message,
            fileReports: response.fileReport
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            uploadNotice: "Failed to upload due to connectivity issues.",
            message: "",
            fileReports: {}
          });
        });
    }
  };

  render() {
    return (
      <div className="upload-page">
        <header className="upload-page__header">
          <div className="upload-page__title">Upload Page</div>
        </header>
        <form className="upload-page__export-form">
          <span className="upload-page__file-instructions">Select file:</span>
          <input
            className="upload-page__file-input"
            onChange={this.onUploadFile}
            type="file"
            multiple
          />
        </form>
        {this.state.loading ? (
          <div className="upload-page__load-indicator">Uploading...</div>
        ) : (
          ""
        )}
        <div className="upload-page__upload-notice">
          {this.state.uploadNotice}
        </div>
        <div className="upload-page__file-report">
          <span className="upload-page__message">{this.state.message}</span>
          <div className="upload-page__file-breakdown">
            {Object.keys(this.state.fileReports).map(
              (reportKey: string, index: number) => (
                <div
                  className="upload-page__error-panel"
                  key={`upload-page__file-report-${index}`}
                >
                  <UploadFileReport
                    filename={reportKey}
                    errorReports={this.state.fileReports[reportKey]}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadPage;
