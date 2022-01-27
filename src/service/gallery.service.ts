import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GalleryService{
public pHost:string="https://pixabay.com/api/";
public wHost:string="https://pixabay.com/api/";
  constructor (public http:HttpClient){
  }

  chercher(req:string, size:number,page:number){
    return this.http.get(this.pHost+"?key=24794934-062ee3d61754a78c1ac493008&q="+req+"&image_type=photo"+"&per_page="+size+"&page="+page)
  }
  loadWeather(kwd){
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?q="+kwd+"&APPID=1a1bc4e5b31f00eeaa306865a4f49c56&lang=fr")
  }

}
