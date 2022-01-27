import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Searchbar} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {GalleryPage} from "../pages/gallery/gallery";
import {MeteoPage} from "../pages/meteo/meteo";
import {PlacesPage} from "../pages/places/places";
import {HttpClientModule} from "@angular/common/http";
import {GalleryService} from "../service/gallery.service";
import {DetailImagePage} from "../pages/detail-image/detail-image";
import {FormsModule} from "@angular/forms";
import {PlaceService} from "../service/placeService";
import {NewPplacePage} from "../pages/new-pplace/new-pplace";
import {SQLite} from "@ionic-native/sqlite";
import {IonicStorageModule} from "@ionic/storage";
import {Geolocation} from "@ionic-native/geolocation";
import {DetailPlacePage} from "../pages/detail-place/detail-place";
/*     SQLite, */
@NgModule({
  declarations: [
    MyApp,
    HomePage,GalleryPage,MeteoPage,PlacesPage,DetailImagePage,NewPplacePage,DetailPlacePage,
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,GalleryPage,MeteoPage,PlacesPage,DetailImagePage,NewPplacePage,DetailPlacePage, Searchbar
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GalleryService, PlaceService,Geolocation,SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
/*
*      IonicStorageModule.forRoot(
      {
        name:'myDBPlaces',
        driverOrder:['indexeddb','sqlite','websql']
      }
    )
* */
