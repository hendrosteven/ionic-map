import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { NetworkPage } from '../network/network';
import { MapsPage } from '../map/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcode: string = '';
  latitude: number = 0;
  longitude: number = 0;

  constructor(public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation) {

  }

  onGetLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude
        this.longitude = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  onScan() {
    this
      .barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.barcode = barcodeData.text;
      }, (err) => {
        console.log(err);
      });
  }

  onGoToNetworkPage(){
    this.navCtrl.push(NetworkPage);
  }

  onOpenMap(){
    this.navCtrl.push(MapsPage);
  }

}
