import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { SignUpService } from './sign-up.service';
import { HomePage } from '../home/home';

@Component({
	selector: 'sign-up',
	templateUrl: 'sign-up.component.html'
})

export class SignUpComponent {
	public userDetails = {
		name: "",
		mail: "",
		password: ""
	};
	private userDataMap = new Map<string, string>();

	constructor(private navCtrl: NavController, private signUpService: SignUpService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

	backToLogin() {
		this.navCtrl.setRoot(HomePage);
	}

	register() {
		let load = this.loadingCtrl.create({
			content: 'Please Wait...'
		});
		load.present();
		this.userDataMap.set('name', this.userDetails.name);
		this.userDataMap.set('password', this.userDetails.password);
		this.userDataMap.set('mail', this.userDetails.mail);
		this.signUpService.callSignUpApi(this.userDataMap)
			.subscribe((response) => {
				console.log(response);
				load.dismiss();
				if (response.status_code === 1) {
					let alert = this.alertCtrl.create({
						title: 'Successful!',
						subTitle: 'You have been registered!',
						buttons: [{
							text: 'Ok',
							handler: () => {
								this.navCtrl.setRoot(HomePage);
							}
						}]
					});
					alert.present();
				}

				if (response.status_code === 0) {
					let alert = this.alertCtrl.create({
						title: 'Unsuccessful!',
						subTitle: 'Could not register! Please try again',
						buttons: [{
							text: 'Ok',
							role: 'cancel'
						}]
					});
					alert.present();
				}

			}, error => {
				load.dismiss();
				console.log(error);
			});
	}
}