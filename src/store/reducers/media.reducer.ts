import * as fromMedia from "../actions/media.action";
import { Media } from "./../../interfaces/media";

export interface MediaState {
  data: Media[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: MediaState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMedia.MediaActions
): MediaState {
  switch (action.type) {
    case fromMedia.LOAD_MEDIA:
      return {
        ...state,
        loading: true
      };
    case fromMedia.LOAD_MEDIA_SUCCESS:
      const data: Media[] = action.payload;
      console.log("from reducer", data);

      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    case fromMedia.LOAD_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromMedia.LOAD_SEARCHING:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case fromMedia.LOAD_SEARCHING_SUCCESS:
      const dataSearch: Media[] = action.payload;

      return {
        ...state,
        loading: false,
        loaded: true,
        data: dataSearch
      };
    case fromMedia.LOAD_SEARCHING_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
  }

  return state;
}

// selectors
export const getMediaLoading = (state: MediaState) => state.loading;
export const getMediaLoaded = (state: MediaState) => state.loaded;
export const getMedia = (state: MediaState) => state.data;
