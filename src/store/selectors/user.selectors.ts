import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromUser from "../reducers/user.reducer";

export const getCurrentUser = createSelector(
  fromFeature.getUserState,
  fromUser.getCurrentUser
);
export const getToken = createSelector(
  fromFeature.getUserState,
  fromUser.getUserToken
);
export const getError = createSelector(
  fromFeature.getUserState,
  fromUser.getError
);

export const getUserStatus = createSelector(
  fromFeature.getUserState,
  fromUser.getUserStatus
);

export const getRegStatus = createSelector(
  fromFeature.getUserState,
  fromUser.getRegStatus
);

export const getUserMedia = createSelector(
  fromFeature.getUserState,
  fromUser.getUserMedia
);

export const getBookmarks = createSelector(
  fromFeature.getUserState,
  fromUser.getBookmarks
);
