import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { AlertController, NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { AdminPageService } from '../../admin-page/admin-page.service';

@Component({
    selector: 'add-product',
    templateUrl: 'add-product.component.html'
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
    public imageBool: boolean = false;
    private productUploadUrl: string = 'http://localhost/Amexs_API/controllers/UploadProduct.php';

    constructor(private actionSheet: ActionSheetController, public domSanitize: DomSanitizer, private camera: Camera, private alertCtrl: AlertController, private adminService: AdminPageService, private loadCtrl: LoadingController) { }

    addProduct() {
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

        this.adminService.callUploadProductApi(productData, this.productUploadUrl)
            .subscribe((response) => {
                console.log(response);
                load.dismiss();
            }, error => {
                console.log(error);
                load.dismiss();
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
            sourceType: sourceType,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        this.camera.getPicture(options)
            .then((imgData) => {
                this.imageBool = true;
                this.base64ImageString = "data:image/jpeg;base64, " + imgData;
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