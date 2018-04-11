import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Network} from '@ionic-native/network';

@IonicPage()
@Component({selector: 'page-network', templateUrl: 'network.html'})
export class NetworkPage {

  message : string = '';
  disconnectSubscription: any;
  connectSubscription: any;

  constructor(public navCtrl : NavController, 
    public navParams : NavParams, 
    private network : Network) {}

  ionViewDidLoad() {
    // watch network for a disconnect
    this.disconnectSubscription = this
      .network
      .onDisconnect()
      .subscribe(() => {
        this.message = 'network was disconnected :-(';
      });

    // watch network for a connection
     this.connectSubscription = this
      .network
      .onConnect()
      .subscribe(() => {
        this.message = 'network connected!';
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.message = this.message.concat(' we got a wifi connection, woohoo!');
          } else if(this.network.type=== '2g'){
            this.message = this.message.concat(' we got a 2g connection, woohoo!');
          } else if(this.network.type=== '3g'){
            this.message = this.message.concat(' we got a 3g connection, woohoo!');
          } else if(this.network.type=== '4g'){
            this.message = this.message.concat(' we got a 4g connection, woohoo!');
          }
        }, 3000);
      });
  }

  ionViewDidLeave(){
    this.disconnectSubscription.unsubscribe();
    this.connectSubscription.unsubscribe();
  }

}
