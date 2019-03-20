import { Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngrx/store";
import { Comment } from "../../interfaces/media";
import { MediaProvider } from "../../providers/media/media";
import * as fromStore from "../../store";

@Pipe({
  name: "comment"
})
export class CommentPipe implements PipeTransform {
  constructor(
    private mediaProvider: MediaProvider,
    private store: Store<fromStore.AppState>
  ) {}

  transform(value: number, ...args) {

    


    return new Promise((resolve, reject) => {
      this.mediaProvider
        .getCommentsByFileId(value)
        .subscribe((res: Comment[]) => {
          resolve(res.length);
        });
    });
  }
}
