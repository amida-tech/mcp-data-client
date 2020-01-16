import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UploadErrorRow from "./UploadErrorRow";
import UploadErrorReport from "./UploadErrorReport";
import ErrorReport from "../../../../models/FileReport";

configure({ adapter: new Adapter() });

describe("Component: UploadErrorRow", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<UploadErrorRow label="The Answer" data={42} />);
    expect(wrapper.find(".upload-error-report__error-label").text()).toEqual(
      "The Answer:"
    );
    expect(wrapper.find(".upload-error-report__error-data").text()).toEqual(
      "42"
    );
  });
});

/** Enzyme by itself is not aware of the computed style values,
 *   and to test that is somewhat pedantic, breaking the tests
 *   over style tweaks. So, we simply check which class is provided.
 */
describe("Component: UploadErrorRow", () => {
  it("renders an incorrect_value_in_row without crashing", () => {
    const incorrectValueInRow: ErrorReport = {
      error_type: "incorrect_value_in_row",
      column_name: "George",
      index: 9,
      json: "Vorhees",
      excel: "georgeSS.xlsx",
      message: "Ch ch ch, ma ma ma..."
    };

    const valueChecks = [
      "Column Name:George",
      "Index:9",
      "JSON:Vorhees",
      "Excel:georgeSS.xlsx",
      "Message:Ch ch ch, ma ma ma..."
    ];

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={incorrectValueInRow}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--incorrect_value_in_row")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(5);
    // console.log(wrapper.find(UploadErrorRow).get(3));
    // expect(wrapper.find(UploadErrorRow).get(3).props()).toEqual({ label: 'Excel', data: incorrectValueInRow.excel });
    console.log(wrapper.find(UploadErrorRow).get(3).props.label); // data is the other
    // That ^ gets back "Label"
  });
});
