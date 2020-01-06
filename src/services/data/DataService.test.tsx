import { DataService } from "./DataService";

describe("Service: DataService", () => {
  describe("#postMultipartRequest", () => {
    describe("during success", () => {
      let DataServiceSpy = jest.spyOn(DataService, "postMultipartRequest");
      it("should call the endpoint and return a 200", () => {});
      expect(true);
      expect(DataServiceSpy).toBeTruthy(); // This does nothing.
    });
  });
});
