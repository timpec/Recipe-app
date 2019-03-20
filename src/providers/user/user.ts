import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  CheckUsername,
  User,
  UserLogin,
  UserLoginResponse,
  UserRatedList,
  UserRegister,
  UserRegisterResponse
} from "../../interfaces/user";
import { HelperProvider } from "./../helper/helper";

@Injectable()
export class UserProvider {
  // this variable contains current user's data (check User type for more details)
  user: User = null;
  isLoggedIn: boolean = false;

  constructor(
    public http: HttpClient,
    private helperProvider: HelperProvider
  ) {}

  // User

  // Login user
  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(
      `${this.helperProvider.baseAPI}/login`,
      data
    );
  }

  // Request the user information
  getUserInfoByUserId(userId: number): Observable<User> {
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.get<User>(
        `${this.helperProvider.baseAPI}/users/${userId}`,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // Register user
  register(data: UserRegister): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(
      `${this.helperProvider.baseAPI}/users`,
      data
    );
  }

  // check is username already exists
  checkUsername = (username: string): Observable<CheckUsername> => {
    return this.http.get<CheckUsername>(`${
      this.helperProvider.baseAPI
    }/users/username/${username}
`);
  };

  // get user rated list

  getUserRatedList(): Observable<UserRatedList[]> {
    return this.http.get<UserRatedList[]>(
      `${this.helperProvider.baseAPI}/ratings`,
      this.helperProvider.getHeaderWithToken()
    );
  }
}
