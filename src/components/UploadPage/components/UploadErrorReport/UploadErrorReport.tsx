import React from "react";
import { ErrorReport } from "../../../../models/FileReport";

interface Props {
  errorReport: ErrorReport;
}

interface State {
  isOpen: boolean;
}

class UploadErrorReport extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="upload-error-report">
        <div
          className={`upload-error-report__header ${
            this.state.isOpen ? "" : "upload-error-report__header--closed"
          }`}
          onClick={this.onToggle}
        >
          Error
          <i
            className={`upload-error-report__arrow ${
              this.state.isOpen ? "down" : "up"
            }`}
          />
        </div>
        {this.state.isOpen ? (
          <div className="upload-error-report__body">
            <div className="upload-error-report__label-column">
              <div className="upload-error-report__label-field">Column:</div>
              <div className="upload-error-report__label-field">Index:</div>
              <div className="upload-error-report__label-field">Excel:</div>
              <div className="upload-error-report__label-field">JSON:</div>
            </div>
            <div className="upload-error-report__data-column">
              <div className="upload-error-report__data-field">
                {this.props.errorReport.columnName}
              </div>
              <div className="upload-error-report__data-field">
                {this.props.errorReport.index}
              </div>
              <div className="upload-error-report__data-field">
                {this.props.errorReport.excel}
              </div>
              <div className="upload-error-report__data-field">
                {this.props.errorReport.json}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default UploadErrorReport;
