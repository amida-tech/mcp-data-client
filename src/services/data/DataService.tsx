import Call from "../../models/Call";
// import { handleResponse } from "../../models/Call";

/**
 * Data Service, named in the assumption of a unique set of REST calls.
 */
export class DataService {
  static postMultipartRequest(data: any, fullURI?: string): Promise<any> {
    const formData = new FormData();
    if (fullURI === undefined) {
      fullURI =
        process.env.REACT_APP_MCP_DATA_MAPPING_UTIL + "api/excel/jsontoexcel";
    }
    formData.append("files", data.file);
    return fetch(fullURI, Call.postForm(formData)).then(response => {
      return response.json().then((data: any) => ({
        status: response.status,
        message: data.message,
        fileReport: data.files
      }));
    });
  }
}
