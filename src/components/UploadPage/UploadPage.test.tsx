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

  it("is successful in its attempts to upload a file", () => {
    mockDataService.setOutcomeSetting(Outcome.REJECT);
    const callSpy = mockDataService.postMultipartRequest(
      {},
      "" + process.env.REACT_APP_MCP_DATA_SOURCE
    );
    const wrapper = shallow(<UploadPage />);
    wrapper.find(".upload-page__file-input").simulate("change", {
      target: {
        files: ["thetestfile.doc"]
      },
      preventDefault: () => {}
    });
    expect(callSpy).toHaveBeenCalled();
  });

  it("is rejected in it attempts to upload a file", () => {
    mockDataService.setOutcomeSetting(Outcome.REJECT);
    const callSpy = mockDataService.postMultipartRequest(
      {},
      "" + process.env.REACT_APP_MCP_DATA_SOURCE
    );
    const wrapper = shallow(<UploadPage />);
    wrapper.find(".upload-page__file-input").simulate("change", {
      target: {
        files: ["thetestfile.doc"]
      },
      preventDefault: () => {}
    });
    expect(callSpy).toHaveBeenCalled();
  });
});
