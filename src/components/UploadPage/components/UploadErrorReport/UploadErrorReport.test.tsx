import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UploadErrorRow from "./UploadErrorRow";
import UploadErrorReport from "./UploadErrorReport";
import {
  ErrorReport,
  IncorrectValueInRow,
  ParenError,
  IncorrectlyFormattedDbqId,
  NoDbqLogicalCombo,
  DbqLogicalComboError,
  WrongDocType,
  UnmatchedParens,
  MockUploadFileReport,
  MarkForComplexityIsUnchecked
} from "../../../../models/FileReport";

configure({ adapter: new Adapter() });

describe("Component: UploadErrorRow", () => {
  it("renders given basic props", () => {
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
  it("has proper open/close functionality", () => {
    const incorrectValueInRow: ErrorReport = MockUploadFileReport!
      .exampleFileNameA![0] as IncorrectValueInRow;

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
        .hasClass("upload-error-report__header--closed")
    ).toBeFalsy();
    expect(
      wrapper.find(".upload-error-report__arrow").hasClass("down")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(7);

    wrapper.find(".upload-error-report__header").simulate("click");
    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--closed")
    ).toBeTruthy();
    expect(
      wrapper.find(".upload-error-report__arrow").hasClass("up")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(0);

    wrapper.find(".upload-error-report__header").simulate("click");
    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--closed")
    ).toBeFalsy();
    expect(
      wrapper.find(".upload-error-report__arrow").hasClass("down")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(7);
  });

  it("renders an 'incorrect_value_in_row' error report correctly", () => {
    const incorrectValueInRow: ErrorReport = MockUploadFileReport!
      .exampleFileNameA![0] as IncorrectValueInRow;

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
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--incorrect_value_in_row")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(7);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Index",
      data: incorrectValueInRow.index
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Column",
      data: incorrectValueInRow.column_name
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "Object Id",
      data: incorrectValueInRow.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
    expect(wrapper.find(UploadErrorRow).get(3).props).toEqual({
      label: "Label",
      data: incorrectValueInRow.label
    });
    expect(wrapper.find(UploadErrorRow).get(3).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-3"
    );
    expect(wrapper.find(UploadErrorRow).get(4).props).toEqual({
      label: "JSON",
      data: incorrectValueInRow.json
    });
    expect(wrapper.find(UploadErrorRow).get(4).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-4"
    );
    expect(wrapper.find(UploadErrorRow).get(5).props).toEqual({
      label: "Excel",
      data: incorrectValueInRow.excel
    });
    expect(wrapper.find(UploadErrorRow).get(5).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-5"
    );
    expect(wrapper.find(UploadErrorRow).get(6).props).toEqual({
      label: "Message",
      data: incorrectValueInRow.message
    });
    expect(wrapper.find(UploadErrorRow).get(6).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-6"
    );
  });

  it("renders a 'paren_error' error report correctly", () => {
    const parenError: ErrorReport = MockUploadFileReport!
      .exampleFileNameA![1] as ParenError;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={parenError}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--paren_error")
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--paren_error")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(4);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Char. Index",
      data: parenError.character_index
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Object Id",
      data: parenError.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "Label",
      data: parenError.label
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
    expect(wrapper.find(UploadErrorRow).get(3).props).toEqual({
      label: "Message",
      data: parenError.message
    });
    expect(wrapper.find(UploadErrorRow).get(3).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-3"
    );
  });

  it("renders an 'incorrectly_formatted_dbq_id' error report correctly", () => {
    const incorrectlyFormattedDbqId: ErrorReport = MockUploadFileReport!
      .exampleFileNameA![2] as IncorrectlyFormattedDbqId;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={incorrectlyFormattedDbqId}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--incorrectly_formatted_dbq_id")
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--incorrectly_formatted_dbq_id")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(4);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Object Id",
      data: incorrectlyFormattedDbqId.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Label",
      data: incorrectlyFormattedDbqId.label
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "DBQ Id",
      data: incorrectlyFormattedDbqId.formatted_dbq_id
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
    expect(wrapper.find(UploadErrorRow).get(3).props).toEqual({
      label: "Message",
      data: incorrectlyFormattedDbqId.message
    });
    expect(wrapper.find(UploadErrorRow).get(3).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-3"
    );
  });

  it("renders a 'no_dbq_logical_combo' error report correctly", () => {
    const noDbqLogicalCombo: ErrorReport = MockUploadFileReport!
      .exampleFileNameA![3] as NoDbqLogicalCombo;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={noDbqLogicalCombo}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--no_dbq_logical_combo")
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--no_dbq_logical_combo")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(3);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Object Id",
      data: noDbqLogicalCombo.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Label",
      data: noDbqLogicalCombo.label
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "Message",
      data: noDbqLogicalCombo.message
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
  });

  it("renders a 'dbq_logical_combo_error' error report correctly", () => {
    const dbqLogicalComboError: ErrorReport = MockUploadFileReport!
      .exampleFileNameB![0] as DbqLogicalComboError;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={dbqLogicalComboError}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--dbq_logical_combo_error")
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--dbq_logical_combo_error")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(4);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Index",
      data: dbqLogicalComboError.index
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Object Id",
      data: dbqLogicalComboError.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "Label",
      data: dbqLogicalComboError.label
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
    expect(wrapper.find(UploadErrorRow).get(3).props).toEqual({
      label: "Message",
      data: dbqLogicalComboError.message
    });
    expect(wrapper.find(UploadErrorRow).get(3).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-3"
    );
  });

  it("renders a 'wrong_doc_type' error report correctly", () => {
    const wrongDocType: ErrorReport = MockUploadFileReport!
      .exampleFileNameB![1] as WrongDocType;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={wrongDocType}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--wrong_doc_type")
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--wrong_doc_type")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(1);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Message",
      data: wrongDocType.message
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
  });

  it("renders an 'unmatched_parens' error report correctly", () => {
    const unmatchedParens: ErrorReport = MockUploadFileReport!
      .exampleFileNameB![2] as UnmatchedParens;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={unmatchedParens}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass("upload-error-report__header--unmatched_parens")
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--unmatched_parens")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(4);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Object Id",
      data: unmatchedParens.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Label",
      data: unmatchedParens.label
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "Positions",
      data: unmatchedParens.list_of_positions.join(", ")
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
    expect(wrapper.find(UploadErrorRow).get(3).props).toEqual({
      label: "Message",
      data: unmatchedParens.message
    });
    expect(wrapper.find(UploadErrorRow).get(3).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-3"
    );
  });

  it("renders a 'mark_for_complexity_is_unchecked' error report correctly", () => {
    const markForComplexityIsUnchecked: ErrorReport = MockUploadFileReport!
      .exampleFileNameB![3] as MarkForComplexityIsUnchecked;

    const wrapper = shallow(
      <UploadErrorReport
        errorReport={markForComplexityIsUnchecked}
        filename={"stuff.xlsx"}
        fileReportIndex={1}
      />
    );

    expect(
      wrapper
        .find(".upload-error-report__header")
        .hasClass(
          "upload-error-report__header--mark_for_complexity_is_unchecked"
        )
    ).toBeTruthy();
    expect(
      wrapper
        .find(".upload-error-report__body")
        .hasClass("upload-error-report__body--mark_for_complexity_is_unchecked")
    ).toBeTruthy();
    expect(wrapper.find(UploadErrorRow).length).toBe(3);
    expect(wrapper.find(UploadErrorRow).get(0).props).toEqual({
      label: "Object Id",
      data: markForComplexityIsUnchecked.object_id
    });
    expect(wrapper.find(UploadErrorRow).get(0).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-0"
    );
    expect(wrapper.find(UploadErrorRow).get(1).props).toEqual({
      label: "Label",
      data: markForComplexityIsUnchecked.label
    });
    expect(wrapper.find(UploadErrorRow).get(1).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-1"
    );
    expect(wrapper.find(UploadErrorRow).get(2).props).toEqual({
      label: "Message",
      data: markForComplexityIsUnchecked.message
    });
    expect(wrapper.find(UploadErrorRow).get(2).key).toEqual(
      "upload-error-report-key-stuff.xlsx-1-2"
    );
  });
});
