import { MockSettings } from "../../util/MockSettings";
import { Outcome } from "../../util/Constants";
import { DataService } from "./DataService";

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
    const callSpy = jest.spyOn(DataService, "postMultipartRequest");
    if (this.outcomeSetting === Outcome.SUCCESS) {
      callSpy.mockResolvedValue(
        Promise.resolve({
          status: 204
        })
      );
    } else if (this.outcomeSetting === Outcome.REJECT) {
      this.defaultRejection(callSpy);
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
    return callSpy;
  }
}
