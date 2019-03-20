import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import { Favorites, Media } from "../../interfaces/media";
import { UserLoginResponse, UserRegisterResponse } from "../../interfaces/user";
import { BookmarkProvider } from "../../providers/bookmark/bookmark";
import { MediaProvider } from "../../providers/media/media";
import { UserProvider } from "../../providers/user/user";
import * as userActions from "../actions/user.action";

@Injectable()
export class UserEffects {
  @Effect()
  login$ = this.actions$.ofType(userActions.LOGIN_USER).pipe(
    switchMap((action: userActions.LoginUser) => {
      return this.userProvider
        .login({
          username: action.payload.username,
          password: action.payload.password
        })
        .pipe(
          map(
            (data: UserLoginResponse) => new userActions.LoginUserSuccess(data)
          ),
          catchError(error => of(new userActions.LoginUserFail(error)))
        );
    })
  );

  @Effect()
  register$ = this.actions$.ofType(userActions.REGISTER_USER).pipe(
    switchMap((action: userActions.RegisterUser) => {
      return this.userProvider
        .register({
          username: action.payload.username,
          email: action.payload.email,
          full_name: action.payload.full_name,
          password: action.payload.password
        })
        .pipe(
          map(
            (data: UserRegisterResponse) =>
              new userActions.RegisterUserSuccess(data)
          ),
          catchError(error => of(new userActions.RegisterUserFail(error)))
        );
    })
  );
  @Effect()
  getUserMedia$ = this.actions$.ofType(userActions.LOAD_USER_MEDIA).pipe(
    switchMap(() => {
      return this.mediaProvider.getCurrentUserMedia().pipe(
        map((data: Media[]) => new userActions.LoadUserMediaSuccess(data)),
        catchError(error => of(new userActions.LoadUserMediaFail(error)))
      );
    })
  );

  @Effect()
  getBookmarks$ = this.actions$.ofType(userActions.LOAD_USER_BOOKMARKS).pipe(
    switchMap(() => {
      return this.bmProvider.getUserFavorites().pipe(
        map(
          (data: Favorites[]) => new userActions.LoadUserBookmarksSuccess(data)
        ),
        catchError(error => of(new userActions.LoadUserBookmarksFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userProvider: UserProvider,
    private mediaProvider: MediaProvider,
    private bmProvider: BookmarkProvider
  ) {}
}
