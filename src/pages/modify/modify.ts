import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TagMessage, CommentDelete, Media } from "../../interfaces/media";
import { MediaProvider } from "../../providers/media/media";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Chooser } from "@ionic-native/chooser";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {

  filled: boolean = false;
  title = '';
  description = '';
  media: Media;
  url = "https://media.mw.metropolia.fi/wbma/media/";
  modify = {
    "title": "",
    "description": ""
  }
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController) {
                this.media = this.navParams.get('image');
                console.log(this.media.file_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPage');
  }

  update(){
    console.log(this.modify);
    this.mediaProvider.updateFile(this.media.file_id, this.modify).subscribe(
      (response: CommentDelete) => {
        console.log(response);
      });
      this.navCtrl.push(ProfilePage);
  }

  // Checks if the form is correctly filled for upload
  isFilled(){
    console.log('Checking isFilled()');
    if(this.title.length > 2 && this.description.length > 4){
      this.filled = true;
      console.log(this.filled);
    } else {
      this.filled = false;
      console.log(this.filled);
    }
  }
}