import { Action } from "@ngrx/store";
import { Favorites, Media } from "../../interfaces/media";
import {
  UserLogin,
  UserLoginResponse,
  UserRegister,
  UserRegisterResponse
} from "../../interfaces/user";

// load media actions
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";

export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";

export const LOAD_USER_MEDIA = "LOAD_USER_MEDIA";
export const LOAD_USER_MEDIA_FAIL = "LOAD_USER_MEDIA_FAIL";
export const LOAD_USER_MEDIA_SUCCESS = "LOAD_USER_MEDIA_SUCCESS";

export const LOAD_USER_BOOKMARKS = "LOAD_USER_BOOKMARKS";
export const LOAD_USER_BOOKMARKS_FAIL = "LOAD_USER_BOOKMARKS_FAIL";
export const LOAD_USER_BOOKMARKS_SUCCESS = "LOAD_USER_BOOKMARKS_SUCCESS";

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";

export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: UserLogin) {}
}
export class LoginUserFail implements Action {
  readonly type = LOGIN_USER_FAIL;
  constructor(public payload: any) {}
}
export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: UserLoginResponse) {}
}

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: UserRegister) {}
}
export class RegisterUserFail implements Action {
  readonly type = REGISTER_USER_FAIL;
  constructor(public payload: any) {}
}
export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  constructor(public payload: UserRegisterResponse) {}
}
export class LoadUserMedia implements Action {
  readonly type = LOAD_USER_MEDIA;
}
export class LoadUserMediaFail implements Action {
  readonly type = LOAD_USER_MEDIA_FAIL;
  constructor(public payload: any) {}
}
export class LoadUserMediaSuccess implements Action {
  readonly type = LOAD_USER_MEDIA_SUCCESS;
  constructor(public payload: Media[]) {}
}

export class LoadUserBookmarks implements Action {
  readonly type = LOAD_USER_BOOKMARKS;
}
export class LoadUserBookmarksSuccess implements Action {
  readonly type = LOAD_USER_BOOKMARKS_SUCCESS;
  constructor(public payload: Favorites[]) {}
}
export class LoadUserBookmarksFail implements Action {
  readonly type = LOAD_USER_BOOKMARKS_FAIL;
  constructor(public payload: any) {}
}

export class ClearUserData implements Action {
  readonly type = CLEAR_USER_DATA;
}

// action types
export type UserActions =
  | LoginUser
  | LoginUserFail
  | LoginUserSuccess
  | RegisterUser
  | RegisterUserFail
  | RegisterUserSuccess
  | LoadUserMedia
  | LoadUserMediaSuccess
  | LoadUserMediaFail
  | LoadUserBookmarks
  | LoadUserBookmarksFail
  | LoadUserBookmarksSuccess
  | ClearUserData;
