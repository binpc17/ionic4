

export class Place {
  title:string;
  pcountry?:string;
  city?:string;
  timeStamp?:number;
  keyword?:string;
  location?:{
    longitude:number,
    latitude:number
  }
  selected?:boolean
  /* We put ? to specify that the attribut are not required*/
}
