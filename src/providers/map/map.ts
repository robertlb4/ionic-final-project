import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';


declare let google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
};

@Injectable()
export class MapProvider {
  lat;
  lng;
  placeResults: any[];

  constructor(public http: HttpClient, public geolocation: Geolocation) {
  }

  initMap(mapElement) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((location) => {
      this.lat = location.coords.latitude
      this.lng = location.coords.longitude
      map = new google.maps.Map(mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });
      resolve()
    }, (error) => {
      console.log(error);
      reject(error);
    }, options)
  
  })
  }

  getPlaces() {
    return new Promise((resolve, reject) => {infowindow = new google.maps.InfoWindow();
      let service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {lat: this.lat, lng: this.lng},
        radius: 1000,
        type: ['restaurant', ]
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.placeResults = results;
          resolve(results);
        } else reject(new Error('errorMsg'))
      });
    })   
  }

  createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

}
