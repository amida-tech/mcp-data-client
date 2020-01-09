import React from "react";
import { ErrorReport } from "../../../../models/FileReport";
import { UploadErrorReport } from "../index";

interface Props {
  filename: string;
  errorReports: Array<ErrorReport>;
}

interface State {
  isOpen: boolean;
}

class UploadFileReport extends React.Component<Props, State> {
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
      <div className="upload-file-report">
        <div className="upload-file-report__header" onClick={this.onToggle}>
          {this.props.filename}
          <i
            className={`upload-file-report__arrow whiteback
            ${this.state.isOpen ? "down" : "up"}`}
          />
        </div>
        <div className="upload-file-report__body">
          {this.state.isOpen
            ? this.props.errorReports.map(
                (errorReport: ErrorReport, index: number) => (
                  <UploadErrorReport
                    key={`$error-report-${this.props.filename}-${index}`}
                    errorReport={errorReport}
                  />
                )
              )
            : ""}
        </div>
      </div>
    );
  }
}

export default UploadFileReport;
