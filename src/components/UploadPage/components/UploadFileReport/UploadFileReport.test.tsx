import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UploadFileReport from "./UploadFileReport";
import { MockUploadFileReport } from "../../../../models/FileReport";
configure({ adapter: new Adapter() });

describe("Component: UploadFileReport", () => {
  it("renders a file report with open/close functionality", () => {
    const wrapper = shallow(
      <UploadFileReport
        filename="example.xlsx"
        errorReports={MockUploadFileReport!.exampleFileNameA}
      />
    );

    expect(wrapper.find(".upload-file-report__header").text()).toEqual(
      "example.xlsx"
    );
  });
});
