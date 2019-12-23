import MockSettings from "../../util/MockSettings";
import { Outcome } from "../../util/Constants";
import { DataService } from "./DataService";

// Remember to use
export class MockDataService extends MockSettings {
  postMultipartRequest(data: any, fullURI: string) {
    const callSpy = jest.spyOn(DataService, "postMultipartRequest");
    if (this.outcomeSetting === Outcome.SUCCESS) {
      callSpy.mockResolvedValue(
        Promise.resolve({
          status: 204
        })
      );
      expect(callSpy).toBeCalled();
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
      expect(callSpy).toBeCalled();
    }
  }
}
