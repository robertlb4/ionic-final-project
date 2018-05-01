import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapProvider } from '../../providers/map/map';
 
declare let google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
};
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;

  constructor(public platform: Platform, public navCtrl: NavController, public geolocation: Geolocation, public _map: MapProvider) {
 
  }
 
  ionViewDidLoad() {
  
    this.platform.ready().then(() => {
      this._map.initMap(this.mapElement)
      .then((res) => {
       return this._map.getPlaces()
     }, (err)=> console.log(err) )
      .then((res: any[]) => {
        res.forEach(marker => this._map.createMarker(marker))
      });
    })
     
  }

  
}