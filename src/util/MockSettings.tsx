import { Outcome } from "./Constants";

/** A controller module for mocked services.
 *
 */

// If you need unique rejections, write them as part of the extended service.
export abstract class MockSettings {
  private _outcomeSetting: Outcome = Outcome.SUCCESS;
  private _outcomeResult: object = {};

  setOutcomeSetting(setting: Outcome) {
    this._outcomeSetting = setting;
  }

  setOutcomeResult(result: object) {
    this._outcomeResult = result;
  }

  get outcomeSetting(): Outcome {
    return this._outcomeSetting;
  }

  get outcomeResult(): object {
    return this._outcomeResult;
  }

  defaultRejection(callSpy: jest.SpyInstance) {
    callSpy.mockResolvedValue(
      Promise.resolve({
        status: 401
      })
    );
  }

  defaultFailure(callSpy: jest.SpyInstance) {
    callSpy.mockResolvedValue(Promise.reject());
  }
}
