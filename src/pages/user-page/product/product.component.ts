import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { UserPageService } from '../user-page.service';

@Component({
    selector: 'product',
    templateUrl: 'product.component.html'
})

export class ProductComponent {
    public singleProductData = [];
    private productId: number;
    public couponFound: boolean = true;
    constructor(private userService: UserPageService, private loadingCtrl: LoadingController, public domSanitize: DomSanitizer, private navCtrl: NavController, private navParams: NavParams, private storage: Storage) {
        this.singleProductData = [];
        let load = this.loadingCtrl.create({
            content: 'Fetching Product...'
        });
        load.present();
        this.productId = this.navParams.get('id');
        this.userService.fetchSingleProduct(this.productId)
            .subscribe((response) => {
                console.log(response);
                if (response.status_code === 1) {
                    this.couponFound = true;
                    this.singleProductData = response.data;
                }
                if (response.status_code === 0) {
                    this.couponFound = false;
                    let single = [];
                    this.storage.get('products')
                        .then((product) => {
                            for (let i = 0; i < product.length; i++) {
                                if(product[i].product_id === this.productId){
                                    single['product_name'] = product[i].product_name;
                                    single['product_descrip'] = product[i].product_descrip;
                                    single['product_price'] = product[i].product_price;
                                    single['product_image'] = product[i].product_image;
                                }
                            }
                        });
                        this.singleProductData.push(single);
                        console.log(this.singleProductData);                        
                }
                load.dismiss();
            }, error => {
                console.log(error);
                load.dismiss();
            });
    }

}