import Call from "../models/Call";

/**
 * Data Service, named in the assumption of a unique set of REST calls.
 */
export function postMultipartRequest(fullURI: string, data: any) {
  const formData = new FormData();
  Object.keys(data).forEach(name => formData.append(name, data[name]));
  return fetch(fullURI, Call.postCall(formData));
}
