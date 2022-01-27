import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import  'rxjs/add/operator/map';
//import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {GalleryService} from "../../service/gallery.service";
import {DetailImagePage} from "../detail-image/detail-image";

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  motCle:string="";
  images:any={hits:[]};
  size:number=10;
  currentPage:number=1;
  totalPages:number;
  constructor (public navCtrl: NavController, public navParams: NavParams,public galleryservice:GalleryService,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }
  /*       .map(resp=>resp.json())
  * */

  onSearchBtn(){
    this.images.hits=[];
    this.onSearch();
  }
  onSearch(){
    /*This is a simple exemple using a Services*/
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loader.present();
    this.galleryservice.chercher(this.motCle,this.size,this.currentPage)
      .subscribe(data=>{
        loader.dismiss();
        this.totalPages=data[0].totalHits/this.size;
        /* Check if division has rest*/
        if(this.totalPages % this.size !=0){++this.totalPages}
        data[0].hits.forEach(h=>{
            this.images.hits.push(h)
          }
        )

      },error=>{
        loader.dismiss();
        console.log("No Internet Aviable..");
      });

    /*
    this.http.get("https://pixabay.com/api/?key=24794934-062ee3d61754a78c1ac493008&q="+this.motCle+"&image_type=photo")
      .subscribe(data=>{
        this.images=data;
        console.log(data);
      },error=>{
        console.log("No Internet Aviable..");
      });
    */
  }
  getImg(img){
    /*using Ionic Pagenavigation*/
    this.navCtrl.push(DetailImagePage,{ image: img });
  }
  loadData(event) {
    console.log(this.currentPage+" "+this.totalPages);
    if(this.currentPage<this.totalPages){
    ++this.currentPage;
  this.onSearch();
      console.log('Done');
      event.complete();
  }
  }

  toggleInfiniteScroll() {
 //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
