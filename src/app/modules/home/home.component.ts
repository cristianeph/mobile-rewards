import { Component, OnInit } from "@angular/core";
import {AuthenticationService} from "~/app/classes/services/authentication-service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        let currentToken = this.authService.currentSession;
        console.log('token actual: ', currentToken);
    }

    socialLogin(type: string) {
        console.log('test!!!');
    }
}
