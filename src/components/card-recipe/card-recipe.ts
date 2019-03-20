import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AddFavoriteResponse } from "../../interfaces/media";
import * as fromStore from "../../store";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

@Component({
  selector: "card-recipe",
  templateUrl: "card-recipe.html"
})
export class CardRecipeComponent implements OnInit {
  @Input() item;
  // @Input() isLoggedIn;
  @Output() fileId = new EventEmitter<number>();

  isFavorite: boolean;
  isLoggedIn: boolean;

  constructor(
    public userProvider: UserProvider,
    private mediaProvider: MediaProvider,
    private bookmarkProvider: BookmarkProvider,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.store
      .select(fromStore.getUserStatus)
      .subscribe(status => (this.isLoggedIn = status));

    this.isLoggedIn &&
      this.store
        .select(fromStore.getBookmarks)
        .subscribe(
          bookmarks =>
            this.isLoggedIn &&
            (this.isFavorite = bookmarks.some(
              bm => bm.file_id === this.item.file_id
            ))
        );
  }

  addBookmark(fileId: number) {
    console.log(this.isFavorite);

    // this.bookmarkProvider.bookmarkHandler.next(fileId);

    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      console.log("add bookmark");

      this.bookmarkProvider
        .addBookmark({ file_id: fileId })
        .subscribe((res: AddFavoriteResponse) => {
          console.log(res);

          this.store.dispatch(new fromStore.LoadUserBookmarks());
        });
    } else {
      console.log("delete bookmark");
      this.bookmarkProvider.deleteFavoriteByFileId(fileId).subscribe(res => {
        console.log(res);
        this.store.dispatch(new fromStore.LoadUserBookmarks());
      });
    }
  }

  showRecipePage(fileId: number) {
    this.mediaProvider.showRecipeView.next(fileId);
  }
}
