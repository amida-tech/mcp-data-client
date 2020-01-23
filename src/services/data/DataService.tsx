import Call from "../../models/Call";
// import { handleResponse } from "../../models/Call";

/**
 * Data Service, named in the assumption of a unique set of REST calls.
 */
class DataService {
  baseURI: string;

  constructor(baseURI: string) {
    this.baseURI = baseURI;
  }

  uploadAndValidateFile(files: any): Promise<any> {
    const formData = new FormData();
    for (let x = 0; x < files.length; x++) {
      formData.append("files", files[x], files[x].name);
    }
    return fetch(
      this.baseURI + "api/excel/validate",
      Call.postForm(formData)
    ).then(response => {
      return response.json().then((data: any) => {
        return {
          status: response.status,
          message: data.message,
          fileReport: data.files
        };
      });
    });
  }
}

export const dataService = new DataService(
  process.env.REACT_APP_MCP_DATA_MAPPING_UTIL || ""
);
