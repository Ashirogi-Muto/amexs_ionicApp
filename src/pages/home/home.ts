import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SignUpComponent } from '../sign-up/sign-up.component';
import { HomeService } from './home.service';
import { AdminPageComponent } from '../admin-page/admin-page.component'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public user = { mail: "", password: "" };
	public admin = { id: "", password: "" };
	userLogin: boolean = true;
	private loginUrl: string = 'http://localhost/Amexs_API/controllers/Login.php';
	constructor(private navCtrl: NavController, private homeService: HomeService, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private storage: Storage) { }


	adminLogin() {
		let load = this.loadingCtrl.create({
			content: "Please wait..."
		});
		load.present();
		let adminData = new Map<string, any>();
		adminData.set('admin_id', this.admin.id);
		adminData.set('admin_password', this.admin.password);
		adminData.set('login_mode', 'admin');
		this.homeService.callLoginApi(adminData, this.loginUrl)
			.subscribe((response) => {
				if (response.status_code === 1) {
					this.storage.set('login_mode', 'admin');
					this.storage.set('admin_id', response.data.admin_id);
					this.storage.set('admin_name', response.data.admin_name);
					load.dismiss();
					this.navCtrl.setRoot(AdminPageComponent);
				}
				if (response.status_code === 0) {
					let alert = this.alertCtrl.create({
						title: 'Error!',
						subTitle: 'Invalid login credentials',
						buttons: ['Ok']
					});
					alert.present();
				}
			}, error => {
				console.log(error);
				load.dismiss();
				let alert = this.alertCtrl.create({
					title: 'Error!',
					subTitle: 'Soemthing went wrong! Please try again',
					buttons: ['Ok']
				});
				alert.present();

			});
	}

	login() {
		let load = this.loadingCtrl.create({
			content: "Please wait..."
		});
		load.present();
		let userData = new Map<string, string>();
		userData.set('mail', this.user.mail);
		userData.set('password', this.user.password);
		userData.set('login_mode', 'user');
		this.homeService.callLoginApi(userData, this.loginUrl)
			.subscribe((response) => {
				if (response.status_code === 1) {
					this.storage.set('login_mode', 'user');
					this.storage.set('login', true);
					this.storage.set('user_id', response.data.user_id);
					this.storage.set('user_name', response.data.user_name);
					load.dismiss();
					// this.navCtrl.setRoot()
				}
				if (response.status_code === 0) {
					load.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Error!',
						subTitle: 'Invalid login credentials',
						buttons: ['Ok']
					});
					alert.present();
				}
			}, error => {
				load.dismiss();
				let alert = this.alertCtrl.create({
					title: 'Error!',
					subTitle: 'Soemthing went wrong! Please try again',
					buttons: ['Ok']
				});
				alert.present();
			});

	}

	/**
	 * set the user login boolean value to true to display user login
	 */
	setUserLoginTrue() {
		this.userLogin = true;
	}

	goToSignUp() {
		this.navCtrl.setRoot(SignUpComponent);
	}


	/**
   * set the user login boolean value to false to display admin login
   */
	setAdminTrue() {
		this.userLogin = false;
	}


}
