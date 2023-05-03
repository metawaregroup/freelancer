import { firebase } from "@react-native-firebase/auth";
import MasterData from "../singletons/master";
import Runtime from "../singletons/runtime";
import { RequestParams, WebRequest } from "./web-request";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DeviceEventEmitter } from "react-native";
import { DeviceEvents, SaveKeys, SystemEvents } from "../constants/constants";
import Logger from "../singletons/logger";

export class APIRequest extends WebRequest {
  protected headers: {} = {};

  constructor() {
    super();
    this.headers = {
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
      "User-Agent": Runtime.instance().user_agent,
      "Version": Runtime.instance().version,
      "Platform": Runtime.instance().platform
    };
  }

  protected createAPI(path: string): string {
    return MasterData.instance().getString("api_server") + encodeURI(path);
  }

  protected async getIdToken():Promise<string | undefined> { return await firebase?.auth()?.currentUser?.getIdToken() }

  protected async requestPost(url: string, dataToSend: {}, requestParams?: RequestParams) {
    return await super.requestPostBase(this.createAPI(url), this.headers, dataToSend, requestParams);
  }

  protected async requestGet(url: string, requestParams?: RequestParams) {
    return await super.requestGetBase(this.createAPI(url), this.headers, requestParams);
  }

  protected checkHeader(url, response):boolean {
    let maintenanceFlag = response?.headers?.map["maintenance"];
    if (maintenanceFlag == "1") {
        DeviceEventEmitter.emit(DeviceEvents.SystemEvent, { type: SystemEvents.Maintenance });
        return true;
    }

    let forceUpdateFlag = response?.headers?.map["force-update"];
    if (forceUpdateFlag == "1") {
        DeviceEventEmitter.emit(DeviceEvents.SystemEvent, { type: SystemEvents.Update });
        return true;
    }
    return false;
}

  protected async requestAccessToken(): Promise<string> {

    return new Promise(async (resolve, reject)=>{
        Logger.log("401 Unauthorized:" + Runtime.instance().access_token);
        var refresh_token = await AsyncStorage.getItem(SaveKeys.RefreshToken);
        if (refresh_token !== null && refresh_token !== "") {
          var uid = await AsyncStorage.getItem(SaveKeys.UID);
          Logger.log({ "uid": uid, "refresh_token": refresh_token });
          try{
            const response = await fetch(this.createAPI("/api/auth/token/refresh"), {
              method: 'POST',
              body: JSON.stringify({ "uid": uid, "refresh_token": refresh_token }),
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });
            const resultData = await response.json();
            if (response.status === 200) {
              
              Runtime.instance().setAccessToken(resultData["access_token"]);
              resolve(resultData["access_token"]);
            } else {
              let token = await this.getIdToken();
              if(token) {
                const externalResponse = await fetch(this.createAPI("/api/auth/external"), {
                  method: 'POST',
                  body: JSON.stringify({ "token": token }),
                  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                });
      
                if (externalResponse.status === 200) {
                  const externalResultData = await externalResponse.json();
                  await AsyncStorage.setItem(SaveKeys.RefreshToken, externalResultData["refresh_token"]);
                  resolve(externalResultData["access_token"]);
                } else {
                  reject("update access token failed.");
                }
              } else {
                reject("id token error.");
              }

            }
          } catch(err) {
            reject(err);
          }
        }
    });
  }
};