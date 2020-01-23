import { dataService } from "./DataService";
import { Stream } from "stream";

describe("Service: DataService", () => {
  describe("postMultipartRequest", () => {
    it("returns a proper response", () => {
      const file0 = new File(["example0"], "example0.txt", {
        type: "text/plain",
        lastModified: 1579797468633
      });
      const file1 = new File(["example1"], "example1.xlsx", {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        lastModified: 1579797468624
      });
      const fileList = {
        0: file0,
        1: file1,
        length: 2,
        item: (index: number) => (index ? file1 : file0)
      };

      const init = { status: 200, message: undefined };
      const body = {
        message: undefined,
        files: {
          "example0.txt": [
            {
              error_type: "wrong_doc_type",
              message: "example0.txt does not end in .xlsx"
            }
          ],
          "example1.xlsx": [
            {
              column_name: "label",
              error_type: "incorrect_value_in_row",
              excel: "Yes",
              index: 5,
              json: "Yes (enum)",
              message: "values do not match"
            }
          ]
        }
      };

      const rs = new Stream.Readable();
      rs.push(JSON.stringify(body));
      rs.push(null);

      const response: Response = new Response(rs.read(), init);

      let dataServiceSpy = jest
        .spyOn(window, "fetch")
        .mockImplementation(() => Promise.resolve(response));

      const testResult = dataService.postMultipartRequest(fileList);

      expect(dataServiceSpy).toHaveBeenCalled();
      testResult.then(response => {
        expect(response.status).toEqual(200);
        expect(response.message).toEqual(undefined);
        expect(response.fileReport["example0.txt"]).toEqual(
          body.files["example0.txt"]
        );
        expect(response.fileReport["example1.xlsx"]).toEqual(
          body.files["example1.xlsx"]
        );
      });
    });
  });
});
