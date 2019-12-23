import React from "react";
import { toast } from "react-toastify";
import { DataService } from "../../services/data/DataService";

type Props = {};

interface State {
  loading: Boolean;
}

class UploadPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
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
          if (response.status !== 200) {
            // A response of *any* kind is technically success.
            toast("Failed to upload. Something is wrong with the endpoint.");
            this.setState({ loading: false });
            return;
          }
          toast("Upload success.");
          this.setState({ loading: false });
        })
        .catch(() => {
          toast("Failed to upload due to connectivity issues.");
          this.setState({ loading: false });
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
      </div>
    );
  }
}

export default UploadPage;
