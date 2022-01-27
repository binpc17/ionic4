import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GalleryService} from "../../service/gallery.service";

/**
 * Generated class for the MeteoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meteo',
  templateUrl: 'meteo.html',
})
export class MeteoPage {
public  twn:string="";
public  mtData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private metservice:GalleryService,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeteoPage');
  }
  onSearchtwn(twnForm){

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loader.present();
    this.metservice.loadWeather(twnForm.twnF)
      .subscribe(data=>{
        loader.dismiss();
        this.mtData=data;
      },error=>{
        loader.dismiss();
        console.log("No Internet Aviable..");
      });
  }
}
