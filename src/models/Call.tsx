export default class Call {
  constructor(
    public method: string,
    public header: Header,
    public body?: any
  ) {}

  public static getCall(): Call {
    return new Call("GET", Header.basicHeader());
  }

  public static postCall(body: object): Call {
    return new Call("POST", Header.basicHeader(), JSON.stringify(body));
  }

  public static postForm(body: object): Call {
    return new Call(
      "POST",
      new Header(`Bearer {token}`, "form/multipart"),
      body
    );
  }
}

export class Header {
  constructor(public Authorization: string, public Accept: string) {}

  /**
   * TODO: Decide how we want to store the token later. It seems the preferred
   * to store the refresh token in cookies and the actual auth token in memory,
   * then just use the refresh token on reload to fetch a fresh auth token.
   */
  public static basicHeader(): Header {
    return new Header(`Bearer {token}`, "application/json");
  }
}

/**
 * Handles the de-jsonifying of a response. May move to util later.
 * @param response
 */
export function handleResponse(response: any) {
  return response
    .json()
    .then((data: any) => ({ status: response.status, message: data.message }));
}
