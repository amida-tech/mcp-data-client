import React from "react";
import { shallow, configure, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../../services/ApolloClient";
import UploadPage from "./UploadPage";
import { MockDataService } from "../../services/data/DataService.mock";
import { Outcome } from "../../util/MockSettings";
import { UploadFileReport } from "./components";
import { MockUploadFileReport } from "../../models/FileReport";

configure({ adapter: new Adapter() });

const mockFileUpload = {
  target: {
    files: ["thetestfile.doc"]
  },
  preventDefault: () => {}
};

const defaultState = function(wrapper: ShallowWrapper) {
  expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
  expect(wrapper.find(".upload-page__upload-notice").text()).toEqual("");
  expect(wrapper.find(".upload-page__message").text()).toEqual("");
  expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
};

const loadingState = function(wrapper: ShallowWrapper) {
  wrapper.find(".upload-page__file-input").simulate("change", mockFileUpload);
  expect(wrapper.find(".upload-page__load-indicator").text()).toEqual(
    "Uploading..."
  );
  expect(wrapper.find(".upload-page__upload-notice").text()).toEqual("");
  expect(wrapper.find(".upload-page__message").text()).toEqual("");
  expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
};

describe("Component: UploadPage", () => {
  const mockDataService = new MockDataService();

  it("renders without crashing", () => {
    const div = document.createElement("div");
    const uploadPage = () => {
      return (
        <ApolloProvider client={client}>
          <UploadPage />
        </ApolloProvider>
      );
    };
    ReactDOM.render(uploadPage(), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("is successful in its attempts to upload a file", async () => {
    mockDataService.setOutcomeSetting(Outcome.SUCCESS);
    mockDataService.setOutcomeAwait(true);
    const callSpy = mockDataService.uploadAndValidateFile({});
    const wrapper = shallow(<UploadPage />);
    defaultState(wrapper);
    loadingState(wrapper);
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
    expect(wrapper.find(".upload-page__upload-notice").text()).toEqual(
      "Upload success."
    );
    expect(wrapper.find(".upload-page__message").text()).toEqual(
      "Validation report"
    );
    expect(wrapper.find(".upload-page__error-panel").exists()).toBe(true);
    expect(wrapper.find(UploadFileReport).length).toBe(2);

    const errorPanel = wrapper.find(".upload-page__error-panel");
    expect(errorPanel.length).toBe(2);
    expect(errorPanel.get(0).key).toEqual("upload-page__file-report-0");
    expect(errorPanel.get(1).key).toEqual("upload-page__file-report-1");

    expect(wrapper.find(UploadFileReport).get(0).props).toEqual({
      filename: "exampleFileNameA",
      errorReports: MockUploadFileReport.exampleFileNameA
    });
    expect(wrapper.find(UploadFileReport).get(1).props).toEqual({
      filename: "exampleFileNameB",
      errorReports: MockUploadFileReport.exampleFileNameB
    });
  });

  it("is rejected in it attempts to upload a file", async () => {
    mockDataService.setOutcomeSetting(Outcome.REJECT);
    mockDataService.setOutcomeAwait(true);
    const callSpy = mockDataService.uploadAndValidateFile({});
    const wrapper = shallow(<UploadPage />);
    defaultState(wrapper);
    loadingState(wrapper);
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
    expect(wrapper.find(".upload-page__upload-notice").text()).toEqual(
      "Failed to upload. Something is wrong with the endpoint."
    );
    expect(wrapper.find(".upload-page__message").text()).toEqual("Doh!");
    expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
  });

  it("fails in it attempts to upload a file", async () => {
    mockDataService.setOutcomeSetting(Outcome.FAILURE);
    mockDataService.setOutcomeAwait(true);
    const callSpy = mockDataService.uploadAndValidateFile({});
    const wrapper = shallow(<UploadPage />);
    defaultState(wrapper);
    loadingState(wrapper);
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
    expect(wrapper.find(".upload-page__upload-notice").text()).toEqual(
      "Failed to upload due to connectivity issues."
    );
    expect(wrapper.find(".upload-page__message").text()).toEqual("");
    expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
  });
});
