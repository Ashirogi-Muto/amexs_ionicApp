import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user = { mail: "", password: "" };
  public admin = { id: "", password: "" };
  userLogin: boolean = true;

  constructor(private navCtrl: NavController) {

  }


  adminLogin() {

  }

  login() {

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
