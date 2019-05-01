import { RequestActionCreator } from "../../middleware";

class RequestServiceCreator {
  baseURL = null;
  apiVersion = null;

  constructor(args = {}) {
    this.baseURL = args.baseURL;
    this.apiVersion = args.apiVersion;
  }

  makeCall(type, { url, method, needAuth, data, headers = {} }, meta) {
    return RequestActionCreator(
      type,
      {
        url: url,
        method,
        needAuth,
        data,
        headers,
        baseURL: this.baseURL
      },
      meta
    );
  }

  get(type, { url, needAuth, headers }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "get",
        needAuth,
        headers
      },
      meta
    );
  }

  post(type, { url, needAuth, headers, data }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "post",
        needAuth,
        headers,
        data
      },
      meta
    );
  }

  put(type, { url, needAuth, headers, data }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "put",
        needAuth,
        headers,
        data
      },
      meta
    );
  }

  patch(type, { url, needAuth, headers, data }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "patch",
        needAuth,
        headers,
        data
      },
      meta
    );
  }

  delete(type, { url, needAuth, headers, data }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "delete",
        needAuth,
        headers,
        data
      },
      meta
    );
  }

  static create(args) {
    return new RequestServiceCreator(args);
  }
}

export default RequestServiceCreator;
