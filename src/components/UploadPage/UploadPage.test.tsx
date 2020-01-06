import React from "react";
import { shallow, configure } from "enzyme";
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
    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.state("uploadNotice")).toEqual("");
    wrapper.find(".upload-page__file-input").simulate("change", testEvent);
    expect(wrapper.state("loading")).toBe(true);
    expect(wrapper.state("uploadNotice")).toEqual("");
    expect(callSpy).toHaveBeenCalled();
    await mockDataService.setOutcomeAwait(false);
    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.state("uploadNotice")).toEqual("Upload success.");
  });

  // it("is rejected in it attempts to upload a file", async () => {
  //   mockDataService.setOutcomeSetting(Outcome.REJECT);
  //   mockDataService.setOutcomeAwait(true);
  //   const callSpy = mockDataService.postMultipartRequest(
  //     {},
  //     "" + process.env.REACT_APP_MCP_DATA_MAPPING_UTIL
  //   );
  //   const wrapper = shallow(<UploadPage />);
  //   expect(wrapper.state("loading")).toBe(false);
  //   expect(wrapper.state("uploadNotice")).toEqual("");
  //   wrapper.find(".upload-page__file-input").simulate("change", testEvent);
  //   expect(wrapper.state("loading")).toBe(true);
  //   expect(wrapper.state("uploadNotice")).toEqual("");
  //   expect(callSpy).toHaveBeenCalled();
  //   await mockDataService.setOutcomeAwait(false);
  //   expect(wrapper.state("loading")).toBe(false);
  //   expect(wrapper.state("uploadNotice")).toEqual(
  //     "Failed to upload. Something is wrong with the endpoint."
  //   );
  // });

  // it("fails in it attempts to upload a file", async () => {
  //   mockDataService.setOutcomeSetting(Outcome.FAILURE);
  //   mockDataService.setOutcomeAwait(true);
  //   const callSpy = mockDataService.postMultipartRequest(
  //     {},
  //     "" + process.env.REACT_APP_MCP_DATA_MAPPING_UTIL
  //   );
  //   const wrapper = shallow(<UploadPage />);
  //   expect(wrapper.state("loading")).toBe(false);
  //   expect(wrapper.state("uploadNotice")).toEqual("");
  //   wrapper.find(".upload-page__file-input").simulate("change", testEvent);
  //   expect(wrapper.state("loading")).toBe(true);
  //   expect(wrapper.state("uploadNotice")).toEqual("");
  //   expect(callSpy).toHaveBeenCalled();
  //   await mockDataService.setOutcomeAwait(false);
  //   expect(wrapper.state("loading")).toBe(false);
  //   expect(wrapper.state("uploadNotice")).toEqual(
  //     "Failed to upload due to connectivity issues."
  //   );
  // });
});
