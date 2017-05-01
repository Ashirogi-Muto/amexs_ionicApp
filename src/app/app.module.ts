import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { HomeService } from '../pages/home/home.service';
/**Admin page components */
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { AdminPageService } from '../pages/admin-page/admin-page.service';
import { AddProductComponent } from '../pages/admin-page/add-product/add-product.component';
import { AddCouponComponent } from '../pages/admin-page/add-coupon/add-coupon.component';

import { ListPage } from '../pages/list/list';
/**sign up components */
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { SignUpService } from '../pages/sign-up/sign-up.service';

/**user page components */
import { UserPageComponent } from '../pages/user-page/user-page.component';
import { UserPageService } from '../pages/user-page/user-page.service';
import { ProductComponent } from '../pages/user-page/product/product.component';

/**log out component */
import { LogOutComponent } from '../pages/log-out/log-out.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
		SignUpComponent,
		AdminPageComponent,
		AddCouponComponent,
		AddProductComponent,
        UserPageComponent,
        LogOutComponent,
        ProductComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ListPage,
		SignUpComponent,
		AdminPageComponent,
		AddCouponComponent,
		AddProductComponent,
        UserPageComponent,
        LogOutComponent,
        ProductComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		SignUpService,
		HomeService,
		AdminPageService,
		Camera,
        UserPageService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
