import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Place} from "../../model/place";
import {PlaceService} from "../../service/placeService";
import {NewPplacePage} from "../new-pplace/new-pplace";
import {DetailPlacePage} from "../detail-place/detail-place";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  places: Array<Place>;
  placesL=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public placeservice:PlaceService,private sqlite: SQLite) {
   /* Olnly Loca Storage
    this.placeservice.getAllPlaces().then(data=>{
      this.places=data;
    })
    */
   /*With SQLite*/
    this.sqlite.create({
      name: 'PlaceDb2.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      /*The Execute qure here*/
      db.executeSql('SELECT id,country,city,title,lat,long FROM placeT',[]).then(data=>{
        if(data.rows.length>0){
        for (let z = 0; z < data.rows.length; z++) {
            this.placesL.push({
              id: data.rows.item(z).id,
              title: data.rows.item(z).title,
              pcountry: data.rows.item(z).country,
              city: data.rows.item(z).city,
              lat: data.rows.item(z).lat,
              long: data.rows.item(z).long
            });
          }
        }else{
          alert("Zero RWo");
        }
      }).catch(e =>{
        alert("..Errror Execute NNX Queyr DB->"+JSON.stringify(e));
        return this.placesL;
      })
    }).catch(e=>{
      alert("..Errror Opening NN Queyr DB->"+JSON.stringify(e));
      return this.placesL;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }
  rmwItm(idItm, idex){
this.placeservice.removeDat(idItm);
    this.placesL.splice(idex, 1)
  }
  onNewPlace(){
this.navCtrl.push(NewPplacePage)
  }

  onDetailPlace(p){
    this.navCtrl.push(DetailPlacePage,{place:p})
  }
}
