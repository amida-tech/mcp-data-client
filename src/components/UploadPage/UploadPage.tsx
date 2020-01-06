import React from "react";
import { DataService } from "../../services/data/DataService";

type Props = {};

interface State {
  loading: Boolean;
  uploadNotice: string;
  message: string;
}

class UploadPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      uploadNotice: "",
      message: ""
    };
    this.onUploadFile = this.onUploadFile.bind(this);
  }

  onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const filename = event.target.files[0].name;
      this.setState({ loading: true, uploadNotice: "", message: "" });
      DataService.postMultipartRequest({
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
              message: response.message
            });
            return;
          }
          this.setState({
            loading: false,
            uploadNotice: "Upload success.",
            message: response.message
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            uploadNotice: "Failed to upload due to connectivity issues.",
            message: ""
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
          <div className="upload-page__indicator">Uploading...</div>
        ) : (
          ""
        )}
        <div className="upload-page__upload-notice">
          {this.state.uploadNotice}
        </div>
        <div className="upload-page__message">{this.state.message}</div>
      </div>
    );
  }
}

export default UploadPage;
