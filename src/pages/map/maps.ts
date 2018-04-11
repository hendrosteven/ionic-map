import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapsPage {

  @ViewChild('map')mapElement : ElementRef;
  map : any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadLocation();
  }


  loadLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      this.loadMap(latitude,longitude);
      this.addMarker(latitude,longitude);
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }

  loadMap(lat, lon){
    let latLng = new google
      .maps
      .LatLng(lat, lon);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google
      .maps
      .Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(latitude,longitude) {
    var marker = new google
      .maps
      .Marker({
        map: this.map,
        position: {
          lat: latitude,
          lng: longitude
        }
      });
    let content = 'My Current Location';
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google
      .maps
      .InfoWindow({content: content});
    google
      .maps
      .event
      .addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
  }
  

}
