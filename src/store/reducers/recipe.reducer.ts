import { Comment, Media } from "../../interfaces/media";
import * as fromRecipe from "../actions/recipe.action";

export interface RecipeState {
  recipe: Media;
  loaded: boolean;
  loading: boolean;
  comments: Comment[] | null;
}

export const initialState: RecipeState = {
  recipe: null,
  loaded: false,
  loading: false,
  comments: null
};

export function reducer(
  state = initialState,
  action: fromRecipe.RecipeActions
): RecipeState {
  switch (action.type) {
    case fromRecipe.LOAD_RECIPE:
      return {
        ...state,
        loading: true
      };
    case fromRecipe.LOAD_RECIPE_SUCCESS:
      const recipe = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        recipe
      };
    case fromRecipe.LOAD_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromRecipe.CLEAR_RECIPE:
      return {
        ...state,
        loading: false,
        loaded: false,
        recipe: null
      };
    case fromRecipe.LOAD_COMMENTS:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case fromRecipe.LOAD_COMMENTS_SUCCESS:
      const comments = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        comments
      };
    case fromRecipe.LOAD_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromRecipe.CLEAR_COMMENTS:
      return {
        ...state,
        loading: false,
        loaded: false,
        comments: null
      };
    case fromRecipe.ADD_COMMENT:
      return {
        ...state
      };
    case fromRecipe.ADD_COMMENT_SUCCESS:
      return {
        ...state
      };
    case fromRecipe.DELETE_COMMENT:
      return {
        ...state
      };
  }

  return state;
}

// selectors

export const getRecipe = (state: RecipeState) => state.recipe;
export const getRecipeLoaded = (state: RecipeState) => state.loaded;
export const getRecipeLoading = (state: RecipeState) => state.loading;

export const getComments = (state: RecipeState) => state.comments;
export const getCommentsLength = (state: RecipeState) => state.comments.length;
