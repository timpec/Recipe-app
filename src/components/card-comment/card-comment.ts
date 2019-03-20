import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Comment } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";

@Component({
  selector: "card-comment",
  templateUrl: "card-comment.html"
})
export class CardCommentComponent {
  @Input() comment: Comment;
  @Output() delComment = new EventEmitter<number>();

  constructor(private mediaProvider: MediaProvider) {}

  removeComment(commentId) {
    this.delComment.emit(commentId);
  }
}
