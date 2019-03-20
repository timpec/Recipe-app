import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../providers/";
import * as mediaActions from "../actions/media.action";
import * as userActions from "../actions/user.action";
@Injectable()
export class MediaEffects {
  @Effect()
  getMedia$ = this.actions$.ofType(mediaActions.LOAD_MEDIA).pipe(
    switchMap(() => {
      return this.mediaProvider.getListOfMediaByTag("kitapp").pipe(
        map(media => new mediaActions.LoadMediaSuccess(media)),
        catchError(error => of(new mediaActions.LoadMediaFail(error)))
      );
    })
  );

  @Effect()
  getSearching$ = this.actions$.ofType(mediaActions.LOAD_SEARCHING).pipe(
    switchMap((action: mediaActions.LoadSearching) => {
      return this.mediaProvider.search(action.payload).pipe(
        map(media => new mediaActions.LoadSearchingSuccess(media)),
        catchError(error => of(new mediaActions.LoadSearchingFail(error)))
      );
    })
  );

  @Effect()
  deleteMedia$ = this.actions$.ofType(mediaActions.DELETE_MEDIA).pipe(
    switchMap((action: mediaActions.DeleteMedia) => {
      return this.mediaProvider
        .deleteFileById(action.payload)
        .pipe(map(() => new userActions.LoadUserMedia()));
    })
  );

  constructor(
    private actions$: Actions,
    private mediaProvider: fromServices.MediaProvider
  ) {}
}
