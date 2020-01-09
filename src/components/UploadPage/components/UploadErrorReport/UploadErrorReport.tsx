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
        <div className="upload-error-report__header">
          Error
          <i
            className={`upload-error-report__arrow 
          ${this.state.isOpen ? "down" : "up"}`}
          />
        </div>
        {this.state.isOpen ? (
          <div className="upload-error-report__display">
            <div className="upload-error-report__field">
              <span className="upload-error_report__field-key">Column:</span>
              {this.props.errorReport.columnName}
            </div>
            <div className="upload-error-report__field">
              <span className="upload-error_report__field-key">Index:</span>
              {this.props.errorReport.index}
            </div>
            <div className="upload-error-report__field">
              <span className="upload-error_report__field-key">Excel:</span>
              {this.props.errorReport.excel}
            </div>
            <div className="upload-error-report__field">
              <span className="upload-error_report__field-key">JSON:</span>
              {this.props.errorReport.json}
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
