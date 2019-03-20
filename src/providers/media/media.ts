import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import {
  Comment,
  CommentDelete,
  CommentRequest,
  CommentResponse,
  Media,
  MediaUpload,
  Rating,
  TagMessage
} from "./../../interfaces/media";
import { HelperProvider } from "./../helper/helper";

@Injectable()
export class MediaProvider {
  _tag: string = "kitapp";

  showRecipeView = new Subject();

  constructor(
    public http: HttpClient,
    private helperProvider: HelperProvider
  ) {}

  // Media
  // Get list of files by tag
  getListOfMediaByTag(tag: string): Observable<Media[]> {
    return this.http
      .get<Media[]>(`${this.helperProvider.baseAPI}/tags/${tag}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  // Get single media
  getSingleMedia(id: number): Observable<Media> {
    return this.http.get<Media>(`${this.helperProvider.baseAPI}/media/${id}`);
  }

  // delete file by id
  deleteFileById(fileId: number) {
    return this.http.delete(`${this.helperProvider.baseAPI}/media/${fileId}`, this.helperProvider.getHeaderWithToken())
  }

  // Request a list of ratings by file id
  getListOfRatingsByFileId(fileId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(
      `${this.helperProvider.baseAPI}/ratings/file/${fileId}`
    );
  }

  // Comments methods
  // Request a list of comments by fileId
  /**
   *
   *
   * @param {number} fileId
   * @returns {Observable<Comment[]>}
   * @memberof MediaProvider
   */
  getCommentsByFileId(fileId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.helperProvider.baseAPI}/comments/file/${fileId}`
    );
  }
  // Delete comment
  /**
   *
   *
   * @param {number} commentId
   * @returns {Observable<CommentDelete>}
   * @memberof MediaProvider
   */
  deleteCommentById(commentId: number): Observable<CommentDelete> {
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.delete<CommentDelete>(
        `${this.helperProvider.baseAPI}/comments/${commentId}`,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // Post new comments
  /**
   *
   *
   * @param {CommentRequest} data
   * @returns {Observable<CommentResponse>}
   * @memberof MediaProvider
   */
  addCommentByFileId(data: CommentRequest): Observable<CommentResponse> {
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.post<CommentResponse>(
        `${this.helperProvider.baseAPI}/comments`,
        data,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // List of file of current user

  /**
   *
   *
   * @returns {Observable<Media[]>}
   * @memberof MediaProvider
   */
  getCurrentUserMedia(): Observable<Media[]> {
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.get<Media[]>(
        `${this.helperProvider.baseAPI}/media/user`,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  addRating(data: { file_id: number; rating: number }) {
    return this.http.post(
      `${this.helperProvider.baseAPI}/ratings`,
      data,
      this.helperProvider.getHeaderWithToken()
    );
  }

  // Post a upload reguest
  upload(data: any) {
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.post<MediaUpload>(
        this.helperProvider.baseAPI + "/media",
        data,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // Post a new tag
  postNewTag(data) {
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.post<TagMessage>(
        this.helperProvider.baseAPI + "/tags",
        data,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  // Search for files by their title
  search(data: any) {
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.post<Media[]>(
        this.helperProvider.baseAPI + "/media/search",
        data,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }

  updateFile(id, modify){
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.put<CommentDelete>(
        this.helperProvider.baseAPI +'/media/' + id, 
        modify, 
        this.helperProvider.getHeaderWithToken()
      );
    }
  }
}
