import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddProductComponent } from '../admin-page/add-product/add-product.component';
import { AddCouponComponent } from '../admin-page/add-coupon/add-coupon.component';

@Component({
    selector: 'admin-page',
    templateUrl: 'admin-page.component.html'
})

export class AdminPageComponent {

    addProduct: AddProductComponent;
    addCoupon : AddCouponComponent;

    constructor(public nav: NavController) { }

    goToProducts(){
        this.nav.push(AddProductComponent);
    }

    goToCoupons(){
        this.nav.push(AddCouponComponent);
    }
}