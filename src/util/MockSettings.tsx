import { Outcome } from "./Constants";

/** A controller module for mocked services.
 *
 */

// If you need unique rejections, write them as part of the extended service.
export abstract class MockSettings {
  private _outcomeSetting: Outcome = Outcome.SUCCESS;
  private _outcomeResult: object = {};
  private _outcomeDelay: number = 0; // Use to loading displays out timeouts.
  private _outcomeAwait: boolean = false; // Similar but checks for "go ahead."

  setOutcomeSetting(setting: Outcome) {
    this._outcomeSetting = setting;
  }

  setOutcomeResult(result: object) {
    this._outcomeResult = result;
  }

  setOutcomeDelay(time: number) {
    this._outcomeDelay = time;
  }

  // When setting to false, you should await this function.
  setOutcomeAwait(flip: boolean) {
    this._outcomeAwait = flip;
    if (!flip) {
      return new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  get outcomeSetting(): Outcome {
    return this._outcomeSetting;
  }

  get outcomeResult(): object {
    return this._outcomeResult;
  }

  get outcomeDelay(): number {
    return this._outcomeDelay;
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

  async delayResponse() {
    if (this._outcomeDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this._outcomeDelay));
    } else if (this._outcomeAwait) {
      const check = setInterval(() => {
        let timesRun = 0;
        if (!this._outcomeAwait || timesRun > 10) {
          clearInterval(check);
          timesRun += 1;
        }
      }, 1000);
    }
  }
}
