import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

import { LoadingController, NavController } from 'ionic-angular';

import { UserPageService } from './user-page.service';
import { ProductComponent } from './product/product.component';
import { LogOutComponent } from '../log-out/log-out.component';

@Component({
    selector: 'user-page',
    templateUrl: 'user-page.component.html'
})

export class UserPageComponent {
    public productData = [];

    constructor(private userService: UserPageService, private loadingCtrl: LoadingController, public domSanitize: DomSanitizer, private navCtrl: NavController, private storage: Storage) {
        let load = this.loadingCtrl.create({
            content: 'Fetching Products...'
        });
        load.present();
        this.userService.fetchProducts()
            .subscribe((response) => {
                console.log(response);
                this.productData = response.data;
                this.storage.set('products', this.productData);
                load.dismiss();
            }, error => {
                console.log(error);
                load.dismiss();
            });
    }


    goToProduct(productId: number) {
        this.navCtrl.push(ProductComponent, {
            id: productId
        });
    }

    logOut(){
        this.navCtrl.push(LogOutComponent);
    }
}