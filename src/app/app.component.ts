import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { AddProductComponent } from '../pages/admin-page/add-product/add-product.component';
import { AddCouponComponent } from '../pages/admin-page/add-coupon/add-coupon.component';
import { UserPageComponent } from '../pages/user-page/user-page.component';
import { LogOutComponent } from '../pages/log-out/log-out.component';

@Component({
	templateUrl: 'app.html',
	styles: [`
        .icon{
            color: #2498FF;
        }
    `]
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;
    public loginMode: string;
	pages: Array<{ title: string, component: any, icon: string }>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Home', component: AdminPageComponent, icon: 'home' },
			{ title: 'Add A Product', component: AddProductComponent, icon: 'cart' },
			{ title: 'Add A Coupon', component: AddCouponComponent, icon: 'cash' },
            { title: 'Log Out', component: LogOutComponent, icon: 'log-out' }
		];        
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			// this.nav.setRoot(AdminPageComponent);
			this.storage.get('login')
				.then((val) => {
					if (val) {
						this.storage.get('login_mode')
							.then((mode) => {
                                this.loginMode = 'admin';
								if(mode === 'admin'){
									this.nav.setRoot(AdminPageComponent);
								}
                                if(mode === 'user'){
                                    this.loginMode = 'user';
                                    this.nav.setRoot(UserPageComponent);
                                }
							});
					}
                    else{
                        this.nav.setRoot(HomePage);
                    }
				});
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
