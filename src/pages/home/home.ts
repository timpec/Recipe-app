import { Component, OnDestroy, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Store } from "@ngrx/store";
import { Loading, LoadingController, NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as fromStore from "../../store";
import { LoginPage } from "../login/login";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  subscriptionShowRecipeView: Subscription;

  mediaList: Media[] = null;
  searchList: Media[] = [];
  search = {
    "title": ""
  }
  searchBar = '';
  media: Media;
  isLoggedIn: boolean;
  media$: Observable<Media[]>;
  loading: Loading;
  _tag: string = "kitapp";

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private storage: Storage,
    public userProvider: UserProvider,
    private store: Store<fromStore.AppState>,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getAllMedia(this._tag, null);
    if (localStorage.getItem("token")) {
      this.storage.get("user").then(user => {
        console.log(user);

        this.store.dispatch(
          new fromStore.LoginUserSuccess({
            message: "Set user from token",
            token: localStorage.getItem("token"),
            user: JSON.parse(user)
          })
        );
      });
    }

    this.media$ = this.store.select<any>(fromStore.getMediaState);
    this.store.select(fromStore.getUserStatus).subscribe(isLogin => {
      isLogin && this.store.dispatch(new fromStore.LoadUserBookmarks());
      this.isLoggedIn = isLogin;
    });
    this.store.dispatch(new fromStore.LoadMedia());

    // this.store.select(fromStore.getMediaLoading).subscribe(loading => {
    //   if (loading) {
    //     // because we create loadingControll instance more then one time, we have to create it here inside the listener
    //     this.loading = this.loadingCtrl.create({
    //       spinner: "crescent",
    //       showBackdrop: false
    //     });
    //     this.loading.present();
    //   }
    // });

    // this.store
    //   .select(fromStore.getMediaLoaded)
    //   .subscribe(loaded => loaded && this.loading.dismiss());

    // if (localStorage.getItem("token")) {
    //   if (!this.userProvider.user) {
    //     this.storage.get("user").then(res => {
    //       this.userProvider.user = JSON.parse(res);
    //       this.userProvider.isLoggedIn = true;
    //     });
    //   }
    // }

    this.subscriptionShowRecipeView = this.mediaProvider.showRecipeView.subscribe(
      (fileId: number) => {
        this.isLoggedIn
          ? this.navCtrl.push(RecipeViewPage, {
              fileId: fileId
            })
          : this.navCtrl.push(LoginPage);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionShowRecipeView.unsubscribe();
  }

  ionViewDidEnter() {
    this.getAllMedia(this._tag, null);
  }

  getAllMedia(tag, title) {
    this.mediaProvider.getListOfMediaByTag(tag).subscribe((res: Media[]) => {
        this.mediaList = res;
        this.mediaList.reverse();
        console.log(res);
        if (title == null) {
          this.mediaList;
        } else if (this.searchBar == ' ') {
          this.mediaList = this.searchList;
        } else {
          this.searchList = this.mediaList.filter(
            value => title.some(value2 => value.title === value2.title));
            console.log(this.searchList);
          this.mediaList = this.searchList;
          console.log(this.mediaList);
        };
    });
  }


  // Checks the searchbar and sends a request for an media array of files
  // containing the searched string in title.
  searchMedia(){
    console.log(this.searchBar);
    if(this.searchBar != '') {
      this.search.title = this.searchBar;
      console.log(this.search);
      this.mediaProvider.search(this.search).subscribe(
        (response: Media[]) => {
          console.log(response);
          this.getAllMedia(this._tag, response);
        });
      } else {
        this.getAllMedia(this._tag, null);
      };
    };
}
