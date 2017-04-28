import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SignUpService } from './sign-up.service';
import { HomePage } from '../home/home';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent {
    public userDetails =  {
        name: "",
        mail: "",
        password: ""
    };

    constructor(private navCtrl: NavController, private signUpService: SignUpService) { }

    backToLogin() {
        this.navCtrl.setRoot(HomePage);
    }

    register(){
        // this.signUpService.callSignUpApi(this.userDetails)
            
    }
}