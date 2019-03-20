import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from "ionic-angular";
import { TagMessage } from "../../interfaces/media";
import { MediaProvider } from "../../providers/media/media";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Chooser } from "@ionic-native/chooser";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage {

  filedata: '';
  title = '';
  description = '';
  blob: any;
  file: any;
  photo: any;
  filled: boolean = false;
  image: boolean = false;
  video: boolean = false;
  tag = {
    "file_id": "",
    "tag": "kitapp"
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController,
    private chooser: Chooser,
    private camera: Camera) {
  }

  ionViewDidLoad() {
  }

  // Shows preview of chosen media
  showPreview(){
    const reader = new FileReader();
    reader.onloadend = () =>{
        this.blob = reader.result;
    };
      reader.readAsDataURL(this.blob);
      console.log(this.blob);
  }

  // Uploads the formdata to the server
  upload(){
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    this.file = this.dataURLtoBlob(this.blob); 
    fd.append('file', this.file);
    this.mediaProvider.upload(fd).subscribe(resp => {
      this.Loading();
      console.log(resp);
      this.tag.file_id = resp.file_id;
      this.postTag(this.tag);
    })
  }

  //Shows the loading spinner after upload
  Loading() {
    console.log("Starting Loading()");
    let loading = this.loadingCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.pop().catch();
      this.navCtrl.push(ProfilePage);
    }, 4000);
  }

  // Posts the "kitapp" tag on the media
  postTag(data){
    this.mediaProvider.postNewTag(data).subscribe(
      (response: TagMessage) => {
        console.log(response);
      })
  }

  // Lets the device user pick a image file for upload
  choose(){
    this.chooser.getFile("image/*")
    .then(result => {
      console.log(result);
      console.log(result.name);
      this.blob = new Blob([result.data], {
        type: result.mediaType,
      });
      console.log(this.blob);
      this.checkMediaType(this.blob.type);
      this.showPreview();
      this.isFilled();
    })
    .catch((error: any) => console.error(error));
  }

  // Opens camera in the device, and then sends data URL
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options)
    .then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.dataURLtoBlob(base64Image));
      this.blob = this.dataURLtoBlob(base64Image);
      this.checkMediaType(this.blob.type);
      this.showPreview();
      this.isFilled();
    }, (err) => {
     // Handle error
    });
  }

  // Converts data URL to a blob
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  // Checks if the form is correctly filled for upload
  isFilled(){
    console.log('Checking isFilled()');
    if(this.title.length > 2 && this.description.length > 4 && this.blob != undefined){
      this.filled = true;
      console.log(this.filled);
    } else {
      this.filled = false;
      console.log(this.filled);
    }
  }

  checkMediaType(data){
    console.log(this.blob.type);
    if(data == "video/mp4"){
      this.video = true;
      this.image = false;
    } else if (data == "image/jpeg") {
      this.image = true;
      this.video = false;
    } else {
      this.video = false;
      this.image = false;
    }
  }
}
