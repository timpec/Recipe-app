import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromMedia from "../reducers/media.reducer";

export const getAllMedia = createSelector(
  fromFeature.getMediaState,
  fromMedia.getMedia
);
export const getMediaLoaded = createSelector(
  fromFeature.getMediaState,
  fromMedia.getMediaLoaded
);
export const getMediaLoading = createSelector(
  fromFeature.getMediaState,
  fromMedia.getMediaLoading
);
