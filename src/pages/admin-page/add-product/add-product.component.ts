import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Camera } from '@ionic-native/camera';

import { AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { AdminPageService } from '../../admin-page/admin-page.service';

@Component({
	selector: 'add-product',
	templateUrl: 'add-product.component.html',
	styles: [`
            .upload-image{
                margin-left: 31%;
            }
    `]
})

export class AddProductComponent {
	public productDetails = {
		uniqueProductId: '',
		productName: '',
		productDescription: '',
		productText: '',
		productPrice: '',
	};
	public base64ImageString: string = null;
	public imageBool: boolean = false;//to show the image div only uploading from device
	private productUploadUrl: string = 'http://hissaria.in/Amexs_API/controllers/UploadProduct.php';

	constructor(private actionSheet: ActionSheetController, public domSanitize: DomSanitizer, private camera: Camera, private alertCtrl: AlertController, private adminService: AdminPageService, private loadCtrl: LoadingController) { }

	addProduct() {
		if (this.productDetails.productDescription === '' || this.productDetails.productName === '' ||
			this.productDetails.productPrice === '' || this.productDetails.productPrice === '' ||
			this.productDetails.uniqueProductId === '') {
			let alertUser = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'Fields cannot be empty!',
				buttons: ['Ok']
			});
			alertUser.present();
			return;
		}

		if (this.base64ImageString === null) {
			let alertUser = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'You need to uplaod a product image!',
				buttons: ['Ok']
			});
			alertUser.present();
			return;
		}

		let load = this.loadCtrl.create({
			content: 'Uploading product. Please wait...'
		});
		load.present();

		let productData = new Map<string, any>();//map to send the product details
		productData.set('product_unique_id', this.productDetails.uniqueProductId);
		productData.set('product_name', this.productDetails.productName);
		productData.set('product_description', this.productDetails.productDescription);
		productData.set('product_text', this.productDetails.productText);
		productData.set('product_price', this.productDetails.productPrice);
		productData.set('product_image', this.base64ImageString);

		this.adminService.callUploadProductApi(productData, this.productUploadUrl)//call the service to call the API
			.subscribe((response) => {
				if (response.status_code === 1) {//product added
					load.dismiss();
					let successAlert = this.alertCtrl.create({
						title: 'Successful',
						subTitle: 'Product Added Successfully!',
						buttons: [{
							text: 'Ok',
							handler: () => {
								/**
								 * reset the input models
								 */
								this.productDetails.productDescription = '';
								this.productDetails.productName = '';
								this.productDetails.productPrice = '';
								this.productDetails.productText = '';
								this.productDetails.uniqueProductId = '';
								this.base64ImageString = null;
								this.imageBool = false;//change the bool value to hide the image div
								successAlert.dismiss();
							}
						}]
					});
					successAlert.present();
				}

				if (response.status_code === 0) {
					let errorAlert = this.alertCtrl.create({
						title: 'Error',
						subTitle: 'Could not add the product!',
						buttons: ['Ok']
					});
					errorAlert.present();
				}
			}, error => {
				load.dismiss();
				let errorAlert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'Could not add the product!',
					buttons: ['Ok']
				});
				errorAlert.present();
			});
	}

	//image upload method using camera native plugin
	presentActionSheet() {
		let actionSheet = this.actionSheet.create({
			title: 'Select Image Source',
			buttons: [
				{
					text: 'Use Camera',
					handler: () => {
						this.takePicture(this.camera.PictureSourceType.CAMERA);//use source as camera
					}
				},
				{
					text: 'Upload From Gallery',
					handler: () => {
						this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);//use source as gallery
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

	takePicture(sourceType) {
		var options = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,//convert data into base64 string
			sourceType: sourceType,//to be selected from the action sheet
			saveToPhotoAlbum: true,
			correctOrientation: true
		};
		this.camera.getPicture(options)
			.then((imgData) => {
				this.imageBool = true;
				this.base64ImageString = "data:image/jpeg;base64, " + imgData;//make a base64 stringof the image
			}, (error) => {
				let alert = this.alertCtrl.create({
					title: 'Error!',
					subTitle: 'Could not upload the image!',
					buttons: ['Ok']
				});
				alert.present();
			});
	}
}