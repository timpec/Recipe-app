import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {
  AddFavoriteRequest,
  AddFavoriteResponse,
  Favorites,
  Media
} from "../../interfaces/media";
import { HelperProvider } from "./../helper/helper";
import { MediaProvider } from "./../media/media";
import { UserProvider } from "./../user/user";

@Injectable()
export class BookmarkProvider {
  bookmarkHandler = new Subject();

  bookmarks: Media[] = [];
  bookmarksChanged = new Subject<Media[]>();

  constructor(
    public http: HttpClient,
    private helperProvider: HelperProvider,
    private mediaProvider: MediaProvider,
    private userProvider: UserProvider
  ) {}

  /**
   *
   *
   * @returns
   * @memberof BookmarkProvider
   */
  getBookmarks() {
    return this.bookmarks;
  }

  /**
   *
   *
   * @param {Favorites[]} bookmarks
   * @memberof BookmarkProvider
   */
  setBookmarks(bookmarks: Media[]) {
    this.bookmarks = bookmarks;
    this.bookmarksChanged.next(this.bookmarks);
  }

  // Reuest a list of favorites
  /**
   *
   *
   * @returns {Observable<Favorites[]>}
   * @memberof MediaProvider
   */

  getUserFavorites(): Observable<Favorites[]> {
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.get<Favorites[]>(
        `${this.helperProvider.baseAPI}/favourites`,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // Delete from favorite

  /**
   *
   *
   * @param {number} fileId
   * @memberof MediaProvider
   */
  deleteFavoriteByFileId(fileId: number) {
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.delete(
        `${this.helperProvider.baseAPI}/favourites/file/${fileId}`,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // Create new favorite
  /**
   *
   *
   * @param {AddFavoriteRequest} data
   * @returns {Observable<AddFavoriteResponse>}
   * @memberof MediaProvider
   */
  addBookmark(data: AddFavoriteRequest): Observable<AddFavoriteResponse> {
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.post<AddFavoriteResponse>(
        `${this.helperProvider.baseAPI}/favourites`,
        data,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }
}
