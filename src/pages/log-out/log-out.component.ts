import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
    selector: 'log-out',
    templateUrl: 'log-out.component.html'
})

export class LogOutComponent {
    constructor(private storage: Storage, private navCtrl: NavController){
        this.storage.set('login', false);
        this.storage.set('login_mode', undefined);
        this.navCtrl.setRoot(HomePage);
    }
}