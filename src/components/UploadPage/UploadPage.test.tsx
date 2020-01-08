import React from "react";
import { shallow, configure, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../../services/ApolloClient";
import UploadPage from "./UploadPage";
import { MockDataService } from "../../services/data/DataService.mock";
import { Outcome } from "../../util/Constants";

configure({ adapter: new Adapter() });

const testEvent = {
  target: {
    files: ["thetestfile.doc"]
  },
  preventDefault: () => {}
};

const defaultState = function(wrapper: ShallowWrapper) {
  expect(wrapper.state("loading")).toBe(false);
  expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
  expect(wrapper.state("uploadNotice")).toEqual("");
  expect(wrapper.find(".upload-page__upload-notice").text()).toEqual("");
  expect(wrapper.state("message")).toEqual("");
  expect(wrapper.find(".upload-page__message").text()).toEqual("");
  expect(wrapper.state("fileReport")).toMatchObject({});
  expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
};

const loadingState = function(wrapper: ShallowWrapper) {
  wrapper.find(".upload-page__file-input").simulate("change", testEvent);
  expect(wrapper.state("loading")).toBe(true);
  expect(wrapper.find(".upload-page__load-indicator").text()).toEqual(
    "Uploading..."
  );
  expect(wrapper.state("uploadNotice")).toEqual("");
  expect(wrapper.find(".upload-page__upload-notice").text()).toEqual("");
  expect(wrapper.state("message")).toEqual("");
  expect(wrapper.find(".upload-page__message").text()).toEqual("");
  expect(wrapper.state("fileReport")).toMatchObject({});
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
    const callSpy = mockDataService.postMultipartRequest(
      {},
      "" + process.env.REACT_APP_MCP_DATA_MAPPING_UTIL
    );
    const wrapper = shallow(<UploadPage />);
    defaultState(wrapper);
    loadingState(wrapper);
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
    expect(wrapper.state("uploadNotice")).toEqual("Upload success.");
    expect(wrapper.find(".upload-page__upload-notice").text()).toEqual(
      "Upload success."
    );
    expect(wrapper.state("message")).toEqual("Validation report");
    expect(wrapper.find(".upload-page__message").text()).toEqual(
      "Validation report"
    );
    expect(wrapper.state("fileReport")).toMatchObject({
      report: "I am the validator."
    });
    expect(wrapper.find(".upload-page__error-panel").exists()).toBe(true);
    expect(wrapper.find(".upload-page__error-panel").text()).toEqual(
      "I am the validator."
    );
  });

  it("is rejected in it attempts to upload a file", async () => {
    mockDataService.setOutcomeSetting(Outcome.REJECT);
    mockDataService.setOutcomeAwait(true);
    const callSpy = mockDataService.postMultipartRequest(
      {},
      "" + process.env.REACT_APP_MCP_DATA_MAPPING_UTIL
    );
    const wrapper = shallow(<UploadPage />);
    defaultState(wrapper);
    loadingState(wrapper);
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
    expect(wrapper.state("uploadNotice")).toEqual(
      "Failed to upload. Something is wrong with the endpoint."
    );
    expect(wrapper.find(".upload-page__upload-notice").text()).toEqual(
      "Failed to upload. Something is wrong with the endpoint."
    );
    expect(wrapper.state("message")).toEqual("Doh!");
    expect(wrapper.find(".upload-page__message").text()).toEqual("Doh!");
    expect(wrapper.state("fileReport")).toMatchObject({});
    expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
  });

  it("fails in it attempts to upload a file", async () => {
    mockDataService.setOutcomeSetting(Outcome.FAILURE);
    mockDataService.setOutcomeAwait(true);
    const callSpy = mockDataService.postMultipartRequest(
      {},
      "" + process.env.REACT_APP_MCP_DATA_MAPPING_UTIL
    );
    const wrapper = shallow(<UploadPage />);
    defaultState(wrapper);
    loadingState(wrapper);
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.find(".upload-page__load-indicator").exists()).toBe(false);
    expect(wrapper.state("uploadNotice")).toEqual(
      "Failed to upload due to connectivity issues."
    );
    expect(wrapper.find(".upload-page__upload-notice").text()).toEqual(
      "Failed to upload due to connectivity issues."
    );
    expect(wrapper.state("message")).toEqual("");
    expect(wrapper.find(".upload-page__message").text()).toEqual("");
    expect(wrapper.state("fileReport")).toMatchObject({});
    expect(wrapper.find(".upload-page__error-panel").exists()).toBe(false);
  });
});
