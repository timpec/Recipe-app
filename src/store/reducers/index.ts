import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromMedia from "./media.reducer";
import * as fromRecipe from "./recipe.reducer";
import * as fromUser from "./user.reducer";

export interface AppState {
  media: fromMedia.MediaState;
  user: fromUser.UserState;
  recipe: fromRecipe.RecipeState;
}

export const reducers: ActionReducerMap<AppState> = {
  media: fromMedia.reducer,
  user: fromUser.reducer,
  recipe: fromRecipe.reducer
};


export const getMediaState = createFeatureSelector<fromMedia.MediaState>(
  "media"
);
export const getUserState = createFeatureSelector<fromUser.UserState>("user");
export const getRecipeState = createFeatureSelector<fromRecipe.RecipeState>(
  "recipe"
);
