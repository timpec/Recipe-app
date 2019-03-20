import { Pipe, PipeTransform } from "@angular/core";
import { MediaProvider } from "../../providers/media/media";
import { Rating } from "./../../interfaces/media";

/**
 * Generated class for the RatingPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "rating"
})
export class RatingPipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {}
  ratingLength: number;
  averageRating: number;
  sumRating: number = 0;
  // FIXME: create more elegant way to implement it
  async transform(value: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider
        .getListOfRatingsByFileId(value)
        .subscribe((res: Rating[]) => {
          this.ratingLength = res.length;
          res.forEach(i => (this.sumRating += i.rating));
          this.ratingLength
            ? resolve((this.sumRating / this.ratingLength).toFixed(1))
            : resolve(0);
        });
    });
  }
}
