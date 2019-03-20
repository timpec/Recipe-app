import { Component, OnDestroy, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Store } from "@ngrx/store";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { User } from "../../interfaces/user";
import * as fromStore from "../../store";
import { Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";
import { UploadPage } from "./../upload/upload";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { ModifyPage } from "../modify/modify";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage implements OnInit, OnDestroy {
  userMedia: Media[];
  userPostsAmount: number;

  user$: Observable<User>;
  userMedia$: Observable<Media[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    private storage: Storage,
    public userProvider: UserProvider,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select<any>(fromStore.getCurrentUser);
    this.userMedia$ = this.store.select(fromStore.getUserMedia);

    this.store
      .select(fromStore.getCurrentUser)
      .subscribe(state => console.log(state));

    this.store
      .select(fromStore.getUserMedia)
      .subscribe(state => (this.userMedia = state));

    this.store.dispatch(new fromStore.LoadUserMedia());
  }

  ngOnDestroy() {}

  logout() {
    return this.storage.remove("user").then(res => {
      console.log(res);
      localStorage.clear();
      this.store.dispatch(new fromStore.ClearUserData());
      this.navCtrl.parent.select(0);
    });
  }

  goToUpload() {
    this.navCtrl.push(UploadPage);
  }
  remove(fileId) {
    console.log(fileId);
    this.store.dispatch(new fromStore.DeleteMedia(fileId));
  }

  viewItem(id) {
    this.navCtrl.push(RecipeViewPage, {
      id: id
    });
  }

  editItem(image) {
    this.navCtrl.push(ModifyPage, {
      image: image
    });
  }
}
