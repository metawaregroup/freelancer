export type RequestParams = {
  onCompleted?: (response: any) => void;
  onError?: Function;
  onFinally?: Function;
  printLog?: boolean;
  paging?: { limit: number; page: number; order?: string };
  queryParams?: {};
  aborter?: AbortController;
  headers?: {};
};

type RequestResult = { response: any; error: any; exception: any };
let isRefreshing = false;
let failedRequestQueue: any = [];

export class WebRequest {
  protected async requestPostBase(
    url: string,
    headers: {},
    dataToSend: {},
    requestParams?: RequestParams
  ): Promise<RequestResult> {
    return await this.requestHttp(
      url,
      { method: "POST", body: JSON.stringify(dataToSend), headers: headers },
      requestParams,
      false
    );
  }

  protected createAPI(path: string): string {
    return encodeURI(path);
  }

  protected async requestGetBase(
    url: string,
    headers: {},
    requestParams?: RequestParams
  ): Promise<RequestResult> {
    if (requestParams?.queryParams) {
      let formBody: string[] = [];
      for (let key in requestParams?.queryParams) {
        formBody.push(
          encodeURIComponent(key) +
            "=" +
            encodeURIComponent(requestParams?.queryParams[key])
        );
      }
      url += "?" + formBody.join("&");
    }

    if (requestParams?.paging) {
      let formBody: string[] = [];
      for (let key in requestParams?.paging) {
        formBody.push(
          encodeURIComponent(key) +
            "=" +
            encodeURIComponent(requestParams?.paging[key])
        );
      }
      url += (requestParams.queryParams ? "&" : "?") + formBody.join("&");
    }

    return await this.requestHttp(
      url,
      { method: "GET", headers: headers },
      requestParams,
      false
    );
  }

  protected async requestPutBase(
    url: string,
    headers: any,
    requestParams?: RequestParams
  ): Promise<RequestResult> {
    if (requestParams?.queryParams) {
      let formBody: string[] = [];
      for (let key in requestParams?.queryParams) {
        formBody.push(
          encodeURIComponent(key) +
            "=" +
            encodeURIComponent(requestParams?.queryParams[key])
        );
      }
      url += "?" + formBody.join("&");
    }

    if (requestParams?.paging) {
      let formBody: string[] = [];
      for (let key in requestParams?.paging) {
        formBody.push(
          encodeURIComponent(key) +
            "=" +
            encodeURIComponent(requestParams?.paging[key])
        );
      }
      url += (requestParams.queryParams ? "&" : "?") + formBody.join("&");
    }

    return await this.requestHttp(
      url,
      { method: "PUT", headers: headers },
      requestParams,
      false
    );
  }

  processFailedRequestQueue(error, token = null) {
    failedRequestQueue.forEach((promise: any) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });

    failedRequestQueue = [];
  }

  protected async requestHttp(
    url: string,
    init: RequestInit,
    requestParams?: RequestParams,
    retry?: boolean
  ): Promise<RequestResult> {
    var result = { response: null, error: null, exception: null };
    try {
      const response = await fetch(url, init);
      if (this.checkHeader(url, response)) {
        return result;
      }
      const resultData = await response.json();
      if (response.status !== 200) {
        if (response.status == 401 && !retry) {
          // Adding requests to failed requests queue when authorization error occured on the first request.
          if (isRefreshing) {
            // Creating new promise and push it into the failed requests queue.
            return new Promise((resolve, reject) =>
              failedRequestQueue.push({ resolve, reject })
            )
              .then((access_token) => {
                if (init.headers)
                  init.headers["Authorization"] = "Bearer " + access_token;
                return this.requestHttp(url, init, requestParams, true);
              })
              .catch((err) => Promise.reject({ exception: err }));
          }
          isRefreshing = true;
          return new Promise((resolve, reject) => {
            // reqeust access token and retry the first request and requests in the failed requests queue.
            this.requestAccessToken()
              .then((access_token: any) => {
                if (access_token) {
                  this.processFailedRequestQueue(null, access_token);
                  if (init.headers)
                    init.headers["Authorization"] = "Bearer " + access_token;
                  resolve(this.requestHttp(url, init, requestParams, true));
                } else {
                  this.processFailedRequestQueue("access_token is null", null);
                  reject("access_token is null.");
                }
              })
              .catch((err) => {
                console.log("processFailedRequestQueue" + JSON.stringify(err));
                this.processFailedRequestQueue(err, null);
                reject(err);
              })
              .then(() => {
                isRefreshing = false;
              });
          });
        } else {
          requestParams?.printLog &&
            console.error(
              "post url " +
                url +
                " " +
                init.body +
                " error: " +
                response.status +
                " message:" +
                JSON.stringify(resultData) +
                " token:"
            );
          requestParams?.onError?.(resultData);
          result.error = resultData;
          return result;
        }
      } else {
        requestParams?.printLog &&
          console.log("response:" + JSON.stringify(resultData));
        requestParams?.onCompleted?.(resultData);
        result.response = resultData;
      }
    } catch (err) {
      requestParams?.printLog && console.error("exception:" + err);
      requestParams?.onError?.(err);
      result.exception = err;
    } finally {
      requestParams?.onFinally?.();
    }
    return result;
  }

  protected async getIdToken(): Promise<string | undefined> {
    return;
  }

  protected async requestAccessToken(): Promise<string | undefined> {
    return;
  }

  protected checkHeader(url, response) {
    return false;
  }
}
