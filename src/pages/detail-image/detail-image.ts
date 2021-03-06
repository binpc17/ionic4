import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-image',
  templateUrl: 'detail-image.html',
})
export class DetailImagePage {
imgs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 /*getting Para from Pages Prevs*/
  this.imgs=navParams.data.image;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailImagePage');
  }

}
