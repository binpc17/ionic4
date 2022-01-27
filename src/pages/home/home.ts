import { Component } from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {PlaceService} from "../../service/placeService";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contact={
    name:"BIN-PC",
    email:'hello@egozola.com',
    photo:'assets/imgs/logo.png'

  }
  firebasePlugin;
  constructor( platform: Platform,public navCtrl: NavController, private  placeservice: PlaceService,public alertController: AlertController) {
    platform.ready().then(() => {
      this.firebasePlugin = (<any>window).FirebasePlugin;
      this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
    });
  }
  getToken() {
    this.firebasePlugin.getToken(token => {
      const alert = this.alertController.create({
        title: 'FCM token',
        subTitle: token,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  onMessageReceived(message){
    if (message.tap) { console.log(`Notification was tapped in the ${message.tap}`); }
    const alert = this.alertController.create({
      title: 'Message received',
      subTitle: JSON.stringify(message),
      buttons: ['OK']
    });
    alert.present();
  }
  creatDb(){
    this.placeservice.createDB();
  }
}
