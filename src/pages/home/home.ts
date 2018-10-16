import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapProvider } from '../../providers/map/map';
import { User } from '../../providers/user/user';
 
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

  constructor(public platform: Platform, public navCtrl: NavController, public geolocation: Geolocation, public _map: MapProvider, public _user: User) {
 
  }
 
  ionViewDidLoad() {
      
    this.platform.ready().then(() => {
      this._map.markers.forEach(marker => { 
        marker.setMap(null);
      })
     this._map.markers = [];
        return new Promise((resolve, reject)=> { this._user.getPreferences()
          .subscribe((res: any)=> {
          this._map.placeSearch = res.searchPreference ? res.searchPreference : [];
          resolve();
          })    
        })
      .then((res: any)=> {
        return this._map.initMap(this.mapElement)
      })
      .then((res) => {
       return this._map.getPlaces()
     })
      .then((res: any[]) => {
        res.forEach(marker => {
          this._map.createMarker(marker)
        })
      });
    })
     
  }

  
}