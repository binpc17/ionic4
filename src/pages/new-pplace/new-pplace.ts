import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Place} from "../../model/place";
import {PlaceService} from "../../service/placeService";
import {Geolocation} from "@ionic-native/geolocation";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

/**
 * Generated class for the NewPplacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-pplace',
  templateUrl: 'new-pplace.html',
})
export class NewPplacePage {
  place: Place;
  constructor(private sqlite: SQLite,public navCtrl: NavController, public navParams: NavParams, private placeService:PlaceService, public geolocation:Geolocation,public loadingCtrl: LoadingController) {
/*
    this.sqlite.create({
      name: 'Gpsdata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXIST GpsT (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, country TEXT, city TEXT)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e))
    */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPplacePage');
  }
  onAddPlace(place: Place){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loader.present();
    place.location={longitude:0,latitude:0};
    place.timeStamp=new Date().getTime();
    this.geolocation.getCurrentPosition().then(position=>{
        loader.dismiss();
  place.location.latitude=position.coords.latitude;
  place.location.longitude=position.coords.longitude;
       // this.placeService.addPlace(place);
        this.navCtrl.pop();
      }
      ).catch(err=>{
      loader.dismiss();
      place.location.latitude=0;
      place.location.longitude=0;
  //    this.placeService.addPlace(place);
      this.navCtrl.pop();
    })
  }
  onAddPlace2(dafaF){
     let latitude=0;
     let longitude=0;
      //    this.placeService.addPlace(place);
    if(dafaF!=null){
     this.placeService.addPlaceSql(dafaF.country,dafaF.city,dafaF.title,longitude,latitude);
      this.navCtrl.pop();
    }
  }

  }
