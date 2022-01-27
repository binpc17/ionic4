import {Injectable} from "@angular/core";
import {Place} from "../model/place";
import {Storage} from "@ionic/storage";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform, ToastController} from "ionic-angular";


@Injectable()
export class PlaceService {
//  databaseObj: SQLiteObject;
  place3: Place;
// public storage:Storage;
 public placeList=[];
  constructor(private sqlite: SQLite,private platform: Platform,public toastCtrl: ToastController){
    /*Only For SQLite*/
      this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      alert("..Errror V11 creating DB->"+JSON.stringify(error))
    })

  }

  private places:Array<Place>=[
    {title:"A"},{title:"B"},{title:"C"}
  ];

  addPlace(place: Place){
    this.places.push(place);
  //  this.storage.set('places',this.places);
  }
  addPlaceSql(pcountry,city,title,longitude,latitude){
    this.sqlite.create({
      name: 'PlaceDb2.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
      db.executeSql('INSERT INTO placeT(country,city,title,lat,long) VALUES (?,?,?,?,?)',[pcountry,city,title,longitude,latitude]).then(data=>{
       // alert("..Succees added");
        const toast = this.toastCtrl.create({
          message: 'Data was added successfully',
          duration: 3000
        });
        toast.present();
      }).catch(e =>{
        alert("..Errror Execute Queyr DB->"+JSON.stringify(e));
      })
      }
    ).catch(e=>{
      alert("..Errror Creting Execute Queyr DB->"+JSON.stringify(e));
    })

    //  this.storage.set('places',this.places);
  }
  removeDat(idD){
    this.sqlite.create({
      name: 'PlaceDb2.db',
      location: 'default'
    }).then((db: SQLiteObject)=>{
        db.executeSql('DELETE FROM placeT WHERE id='+idD,[]).then(data=>{
          alert("..Succees Remover");
        }).catch(e =>{
          alert("..Errror Execute Queyr DB->"+JSON.stringify(e));
        })
      }
    ).catch(e=>{
      alert("..Errror Creting Execute Queyr DB->"+JSON.stringify(e));
    })

    //  this.storage.set('places',this.places);
  }
  getAllPlaces(){
   // return this.places;
   /*   With Only Local Storage
 return  this.storage.get('places').then(data=>{
      this.places=data!=null?data:[];
      return this.places;

    })
    */
  }
  getAllPlaceSqlite(){
    return this.dbCheck().then((db: SQLiteObject)=>{
     /*The Execute qure here*/
     db.executeSql('SELECT country,city,title,lat,long FROM placeT', []).then(data=>{
       return data!=null?data:[];
      }).catch(e =>{
       alert("..Errror Execute NN Queyr DB->"+JSON.stringify(e));
       return this.placeList;
     })
   }).catch(e=>{
      alert("..Errror Opening NN Queyr DB->"+JSON.stringify(e));
     return this.placeList;
   })
  }

  // Create DB if not there
  createDB() {
    console.log('Colling DB');
    this.sqlite.create({
      name: 'PlaceDb2.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE  TABLE  IF NOT EXISTS placeT(id integer primary key,country text,city text,title text,lat integer, long integer)', [])
          .then(() =>  console.log('DB Created Executed SQL'))
          .catch(e =>  console.log("Error creating Db V1>"+JSON.stringify(e)));

      })
      .catch(e => console.log("..Errror creating DB->"+JSON.stringify(e)))
  }
  dbCheck(){
    return this.sqlite.create({
      name: 'PlaceDb2.db',
      location: 'default'
    })
  }

}
