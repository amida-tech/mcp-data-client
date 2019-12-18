export default class Call {
  constructor(
    public method: string,
    public header: Header,
    public body?: string
  ) {}

  public static getCall(): Call {
    return new Call("GET", Header.basicHeader());
  }

  public static postCall(body: object): Call {
    return new Call("POST", Header.basicHeader(), JSON.stringify(body));
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
