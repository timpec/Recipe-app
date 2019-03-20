import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";
import { HomePage } from "../home/home";
import { BookmarksPage } from "./../bookmarks/bookmarks";
import { LoginPage } from "./../login/login";
import { ProfilePage } from "./../profile/profile";

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {
  homePage = HomePage;
  profilePage = ProfilePage;
  bookmarksPage = BookmarksPage;
  loginPage = LoginPage;

  isLoggedIn$: Observable<boolean | null>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(fromStore.getUserStatus);
  }
}
