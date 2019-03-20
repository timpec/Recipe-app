import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
  constructor(public http: HttpClient) {
    console.log("Hello HelperProvider Provider");
  }

  baseAPI = "http://media.mw.metropolia.fi/wbma";
  mediaFilePath = "http://media.mw.metropolia.fi/wbma/uploads/";

  getHeaderWithToken(): object | null {
    const token = localStorage.getItem("token");
    let options: object | null = null;

    if (token) {
      options = {
        headers: new HttpHeaders({
          "x-access-token": token
        })
      };
    }
    return options;
  }
}
