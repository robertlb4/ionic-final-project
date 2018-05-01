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
    // Promise.all([this._map.initMap(this.mapElement), this._map.getPlaces()])
    // .then((res) => {
    //   console.log(res);
    // }, err=> console.log(err.message))
    this.platform.ready().then(() => {
      this._map.initMap(this.mapElement)
      .then((res) => {
       return this._map.getPlaces()
     }, (err)=> console.log(err) )
      .then((res: any[]) => {
        //res.forEach(marker => this._map.createMarker(marker))
      });
    })
     
  }

  // initMap() {

  //   navigator.geolocation.getCurrentPosition((location) => {
  //     map = new google.maps.Map(this.mapElement.nativeElement, {
  //       center: {lat: location.coords.latitude, lng: location.coords.longitude},
  //       zoom: 14
  //     });
      
  //     infowindow = new google.maps.InfoWindow();
  //     let service = new google.maps.places.PlacesService(map);
  //     service.nearbySearch({
  //       location: {lat: location.coords.latitude, lng: location.coords.longitude},
  //       radius: 2000,
  //       type: ['restaurant', ]
  //     }, (results,status) => {
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         for (let i = 0; i < results.length; i++) {
  //           this.createMarker(results[i]);
  //         }
  //       }
  //     });
  //   }, (error) => {
  //     console.log(error);
  //   }, options);
  // }

  // createMarker(place) {
  //   let placeLoc = place.geometry.location;
  //   let image = {
  //     url: place.icon,
  //     size: new google.maps.Size(71, 71),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(17, 34),
  //     scaledSize: new google.maps.Size(25, 25)
  //   };
  //   let marker = new google.maps.Marker({
  //     map: map,
  //     position: placeLoc,
  //     icon: image,
  //   });
  
  //   google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.setContent(place.name);
  //     infowindow.open(map, this);
  //   });
  // }
  
  
  
  
  
  
  
  // ionViewDidLoad(){
  //   this.loadMap();
  // }
 
  // loadMap(){
 
  //   this.geolocation.getCurrentPosition().then(position => {
      
  //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }
   
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
  //   })
  //   .catch(err => console.log(err));
  // }
}