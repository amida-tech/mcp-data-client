import Call from "../../models/Call";

/**
 * Data Service, named in the assumption of a unique set of REST calls.
 */
export class DataService {
  static postMultipartRequest(data: any, fullURI?: string): Promise<any> {
    const formData = new FormData();
    if (fullURI === undefined) {
      fullURI = process.env.REACT_APP_MCP_DATA_SOURCE + "files";
    }
    Object.keys(data).forEach((name: string) =>
      formData.append(name, data[name])
    );
    return fetch(fullURI, Call.postCall(formData));
  }
}
