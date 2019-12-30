import React from "react";
import { DataService } from "../../services/data/DataService";

type Props = {};

interface State {
  loading: Boolean;
  uploadMessage: string;
}

class UploadPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      uploadMessage: ""
    };
    this.onUploadFile = this.onUploadFile.bind(this);
  }

  onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const filename = event.target.files[0].name;
      this.setState({ loading: true });
      DataService.postMultipartRequest({
        file: event.target.files[0],
        filename
      })
        .then(response => {
          if (response.status !== 204) {
            // A response of *any* kind is technically success.
            this.setState({
              loading: false,
              uploadMessage:
                "Failed to upload. Something is wrong with the endpoint."
            });
            return;
          }
          this.setState({ loading: false, uploadMessage: "Upload success." });
        })
        .catch(() => {
          this.setState({
            loading: false,
            uploadMessage: "Failed to upload due to connectivity issues."
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
          />
        </form>
        {this.state.loading ? (
          <div className="upload-page__indicator">Uploading...</div>
        ) : (
          ""
        )}
        <div className="upload-page__upload-info">
          {this.state.uploadMessage}
        </div>
      </div>
    );
  }
}

export default UploadPage;
