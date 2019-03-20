import { NgModule } from "@angular/core";
import { CommentPipe } from "./comment/comment";
import { OwnerPipe } from "./owner/owner";
import { RatingPipe } from "./rating/rating";
import { ReversePipe } from "./reverse/reverse";
import { ThumbnailPipe } from "./thumbnail/thumbnail";
import { UsernamePipe } from "./username/username";
@NgModule({
  declarations: [
    ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    OwnerPipe,
    UsernamePipe,
    ReversePipe
  ],
  imports: [],
  exports: [
    ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    OwnerPipe,
    UsernamePipe,
    ReversePipe
  ]
})
export class PipesModule {}
