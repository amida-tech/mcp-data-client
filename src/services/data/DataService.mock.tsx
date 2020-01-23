import { MockSettings, Outcome } from "../../util/MockSettings";
import { dataService } from "./DataService";
import { MockUploadFileReport } from "../../models/FileReport";

/**
 * The mock module is used as part of testing other modules
 * that make API calls.
 * Remember to use MockDataService.setOutcomeResult to get
 *  results from the "unique" settings option.
 */
export class MockDataService extends MockSettings {
  constructor() {
    super();
    this.setOutcomeSetting(Outcome.SUCCESS);
  }

  postMultipartRequest(data: any, fullURI: string) {
    const callSpy = jest.spyOn(dataService, "postMultipartRequest");
    if (this.outcomeSetting === Outcome.SUCCESS) {
      callSpy.mockResolvedValue(
        Promise.resolve({
          status: 200,
          message: "Validation report",
          fileReport: MockUploadFileReport
        })
      );
    } else if (this.outcomeSetting === Outcome.REJECT) {
      callSpy.mockResolvedValue(
        Promise.resolve({
          status: 500,
          message: "Doh!"
        })
      );
    } else if (this.outcomeSetting === Outcome.FAILURE) {
      this.defaultFailure(callSpy);
    } else {
      callSpy.mockResolvedValue(
        Promise.resolve({
          status: 200,
          data: this.outcomeResult
        })
      );
    }
    this.delayResponse();
    return callSpy;
  }
}
