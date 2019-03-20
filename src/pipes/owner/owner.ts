import { OnInit, Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";

@Pipe({
  name: "owner"
})
export class OwnerPipe implements PipeTransform, OnInit {
  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {}

  transform(userId: number, ...args) {
    return new Promise((resolve, reject) => {
      this.store.select(fromStore.getCurrentUser).subscribe(state => {
        console.log(state);

        if (state && state.user_id === userId) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
