import React from "react";

const UploadPage: React.FC = () => {
  return (
    <div className="upload-page">
      <header className="upload-page__header">
        <div className="upload-page__title">Upload Page</div>
      </header>
      <form className="upload-page__export-form">
        <span className="upload-page__file-instructions">Select file:</span>
        <input className="upload-page__file-input" type="file" />
        <button className="upload-page__file-button">Upload File</button>
      </form>
    </div>
  );
};

export default UploadPage;
