import { Action } from "@ngrx/store";
import { Media } from "./../../interfaces/media";

// load media actions
export const LOAD_MEDIA = "LOAD_MEDIA";
export const LOAD_MEDIA_FAIL = "LOAD_MEDIA_FAIL";
export const LOAD_MEDIA_SUCCESS = "LOAD_MEDIA_SUCCESS";

export const LOAD_SEARCHING = "LOAD_SEARCHING";
export const LOAD_SEARCHING_FAIL = "LOAD_SEARCHING_FAIL";
export const LOAD_SEARCHING_SUCCESS = "LOAD_SEARCHING_SUCCESS";

export const DELETE_MEDIA = "DELETE_MEDIA";
export const DELETE_MEDIA_SUCCESS = "DELETE_MEDIA_SUCCESS";

export class LoadMedia implements Action {
  readonly type = LOAD_MEDIA;
}
export class LoadMediaFail implements Action {
  readonly type = LOAD_MEDIA_FAIL;
  constructor(public payload: any[]) {}
}
export class LoadMediaSuccess implements Action {
  readonly type = LOAD_MEDIA_SUCCESS;
  constructor(public payload: Media[]) {}
}

export class LoadSearching implements Action {
  readonly type = LOAD_SEARCHING;
  constructor(public payload: any) {}
}
export class LoadSearchingFail implements Action {
  readonly type = LOAD_SEARCHING_FAIL;
  constructor(public payload: Media[]) {}
}
export class LoadSearchingSuccess implements Action {
  readonly type = LOAD_SEARCHING_SUCCESS;
  constructor(public payload: Media[]) {}
}

export class DeleteMedia implements Action {
  readonly type = DELETE_MEDIA;
  constructor(public payload: number) {}
}
export class DeleteMediaSuccess implements Action {
  readonly type = DELETE_MEDIA_SUCCESS;
}

// action types
export type MediaActions =
  | LoadMedia
  | LoadMediaFail
  | LoadMediaSuccess
  | LoadSearching
  | LoadSearchingFail
  | LoadSearchingSuccess
  | DeleteMedia
  | DeleteMediaSuccess;
