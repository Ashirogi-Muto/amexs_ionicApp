import { Component } from '@angular/core';

import { AlertController, LoadingController } from 'ionic-angular';

import { AdminPageService } from '../../admin-page/admin-page.service';

@Component({
	selector: 'add-coupon',
	templateUrl: 'add-coupon.component.html'
})

export class AddCouponComponent {
	public couponDetails = {
		couponUniqueId: '',
		couponName: '',
		couponProductId: '',
		couponReductionValue: ''
	};
	private uploadCouponUrl = 'http://hissaria.in/Amexs_API/controllers/UploadCoupon.php'
	constructor(private adminService: AdminPageService, private alertCtrl: AlertController, private loadCtrl: LoadingController) { }

	addCoupon() {
		if(this.couponDetails.couponName === '' || this.couponDetails.couponProductId === '' ||
		this.couponDetails.couponReductionValue === '' || this.couponDetails.couponUniqueId === ''){
			let alertUser = this.alertCtrl.create({
				title: 'Error!',
				subTitle: 'You need to fill all the details',
				buttons: ['Ok']
			});
			alertUser.present();
			return;
		}

		let load = this.loadCtrl.create({
			content: 'Uploading Coupon. Please wait...'
		});
		load.present();	

		let couponData = new Map<string, any>();
		couponData.set('unique_id', this.couponDetails.couponUniqueId);
		couponData.set('coupon_name', this.couponDetails.couponName);
		couponData.set('coupon_product_id', this.couponDetails.couponProductId);
		couponData.set('reduction_value', this.couponDetails.couponReductionValue);
		console.log(couponData);
		this.adminService.callUploadCouponApi(couponData, this.uploadCouponUrl)
			.subscribe((response) => {
				if(response.status_code === 1){
					load.dismiss();
                    this.couponDetails.couponName = '';
                    this.couponDetails.couponProductId = '';
                    this.couponDetails.couponReductionValue = '';
                    this.couponDetails.couponUniqueId = '';
					let successAlert = this.alertCtrl.create({
						title: 'Successful',
						subTitle: 'Coupon Added Successfully!',
						buttons: ['Ok']
					});
					successAlert.present();
				}

				if(response.status_code === 0){
					load.dismiss();
					let errorAlert = this.alertCtrl.create({
						title: 'Error',
						subTitle: 'Could not add the coupon!',
						buttons: ['Ok']
					});
					errorAlert.present();
				}
			}, error =>{
				load.dismiss();
				let errorAlert = this.alertCtrl.create({
						title: 'Error',
						subTitle: 'Something went wrong! Please try again!',
						buttons: ['Ok']
					});
					errorAlert.present();
			});
	}
}