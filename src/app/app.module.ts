import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule } from "@ionic/storage";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { StarRatingModule } from "ionic3-star-rating";
import { HomePage } from "../pages/home/home";
import { BookmarkProvider } from "../providers/bookmark/bookmark";
import { HelperProvider } from "../providers/helper/helper";
import { MediaProvider } from "../providers/media/media";
import { UserProvider } from "../providers/user/user";
import { effects, reducers } from "../store";
import { CardCommentComponent } from "./../components/card-comment/card-comment";
import { CardRecipeComponent } from "./../components/card-recipe/card-recipe";
import { BookmarksPage } from "./../pages/bookmarks/bookmarks";
import { CommentsPage } from "./../pages/comments/comments";
import { LoginPage } from "./../pages/login/login";
import { ProfilePage } from "./../pages/profile/profile";
import { RecipeViewPage } from "./../pages/recipe-view/recipe-view";
import { TabsPage } from "./../pages/tabs/tabs";
import { UploadPage } from "./../pages/upload/upload";
import { PipesModule } from "./../pipes/pipes.module";
import { MyApp } from "./app.component";
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera';
import { ModifyPage } from "../pages/modify/modify";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    UploadPage,
    BookmarksPage,
    CardRecipeComponent,
    RecipeViewPage,
    CommentsPage,
    ModifyPage,
    CardCommentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PipesModule,
    StarRatingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    UploadPage,
    BookmarksPage,
    RecipeViewPage,
    CommentsPage,
    ModifyPage
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
    UserProvider,
    BookmarkProvider,
    HelperProvider,
    Chooser,
    Camera,
  ]
})
export class AppModule {}
