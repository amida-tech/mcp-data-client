import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UploadFileReport from "./UploadFileReport";
import { UploadErrorReport } from "../";
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
    expect(
      wrapper.find(".upload-file-report__arrow").hasClass("down")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorReport).length).toBe(4);

    wrapper.find(".upload-file-report__header").simulate("click");
    expect(
      wrapper.find(".upload-file-report__arrow").hasClass("up")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorReport).length).toBe(0);

    wrapper.find(".upload-file-report__header").simulate("click");
    expect(
      wrapper.find(".upload-file-report__arrow").hasClass("down")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorReport).length).toBe(4);
  });

  it("renders a file report with successful validation", () => {
    const wrapper = shallow(
      <UploadFileReport filename="example.xlsx" errorReports={null} />
    );

    expect(wrapper.find(UploadErrorReport).length).toBe(0);
    expect(wrapper.find(".upload-file-report__success").text()).toEqual(
      "No errors detected."
    );
  });

  it("renders a file report with errors, and passes props to Error Reports", () => {
    const wrapper = shallow(
      <UploadFileReport
        filename="example.xlsx"
        errorReports={MockUploadFileReport!.exampleFileNameB}
      />
    );
    const results = wrapper.find(UploadErrorReport);
    expect(results.length).toBe(4);
    for (let i = 0; i < 4; i++) {
      expect(results.get(i).key).toEqual(`error-report-example.xlsx-${i}`);
      expect(results.get(i).props).toEqual({
        errorReport: MockUploadFileReport!.exampleFileNameB![i],
        filename: "example.xlsx",
        fileReportIndex: i
      });
    }
  });
});
