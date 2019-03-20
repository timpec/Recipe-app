import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromRecipe from "../reducers/recipe.reducer";

export const getRecipe = createSelector(
  fromFeature.getRecipeState,
  fromRecipe.getRecipe
);
export const getRecipeLoaded = createSelector(
  fromFeature.getRecipeState,
  fromRecipe.getRecipeLoaded
);
export const getRecipeLoading = createSelector(
  fromFeature.getRecipeState,
  fromRecipe.getRecipeLoading
);

export const getCommnets = createSelector(
  fromFeature.getRecipeState,
  fromRecipe.getComments
);

export const getCommentsLength = createSelector(
  fromFeature.getRecipeState,
  fromRecipe.getCommentsLength
);
