import { Action } from "@ngrx/store";
import { CommentRequest, CommentResponse, Media } from "../../interfaces/media";

// load media actions
export const LOAD_RECIPE = "LOAD_RECIPE";
export const LOAD_RECIPE_FAIL = "LOAD_RECIPE_FAIL";
export const LOAD_RECIPE_SUCCESS = "LOAD_RECIPE_SUCCESS";
export const CLEAR_RECIPE = "CLEAR_RECIPE";

export const LOAD_COMMENTS = "LOAD_COMMENTS";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAIL = "LOAD_COMMENTS_FAIL";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENTS_SUCCESS";
export const DELETE_COMMENT_FAIL = "DELETE_COMMENTS_SUCCESS_FAIL";

export class LoadRecipe implements Action {
  readonly type = LOAD_RECIPE;
  constructor(public payload: number) {}
}
export class LoadRecipeFail implements Action {
  readonly type = LOAD_RECIPE_FAIL;
  constructor(public payload: any) {}
}
export class LoadRecipeSuccess implements Action {
  readonly type = LOAD_RECIPE_SUCCESS;
  constructor(public payload: Media) {}
}
export class clearRecipe implements Action {
  readonly type = CLEAR_RECIPE;
}

export class LoadComments implements Action {
  readonly type = LOAD_COMMENTS;
  constructor(public payload: number) {}
}
export class LoadCommentsSuccess implements Action {
  readonly type = LOAD_COMMENTS_SUCCESS;
  constructor(public payload: CommentResponse[]) {}
}
export class LoadCommentsFail implements Action {
  readonly type = LOAD_COMMENTS_FAIL;
  constructor(public payload: any) {}
}
export class ClearComments implements Action {
  readonly type = CLEAR_COMMENTS;
}

export class AddComment implements Action {
  readonly type = ADD_COMMENT;
  constructor(public payload: CommentRequest) {}
}
export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;
  constructor(public payload: CommentResponse) {}
}

export class DeleteComment implements Action {
  readonly type = DELETE_COMMENT;
  constructor(public payload: { comment_id: number; fileId: number }) {}
}
export class DeleteCommentSuccess implements Action {
  readonly type = DELETE_COMMENT_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteCommentFail implements Action {
  readonly type = DELETE_COMMENT_FAIL;
  constructor(public payload: any) {}
}

// action types
export type RecipeActions =
  | LoadRecipe
  | LoadRecipeFail
  | LoadRecipeSuccess
  | clearRecipe
  | LoadComments
  | LoadCommentsFail
  | LoadCommentsSuccess
  | ClearComments
  | AddComment
  | AddCommentSuccess
  | DeleteComment
  | DeleteCommentFail
  | DeleteCommentSuccess;
