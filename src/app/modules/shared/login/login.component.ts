import {Component, OnInit} from '@angular/core';
import {ITnsOAuthTokenResult} from "nativescript-oauth2";
import {AuthenticationService} from "~/app/classes/services/authentication-service";
import {Page} from "tns-core-modules/ui/page";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    moduleId: module.id,
})
export class LoginComponent implements OnInit {

    constructor(private page: Page,
                private authService: AuthenticationService,
                private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        let currentToken = this.authService.currentSession;
        console.log('token actual: ', currentToken);
        if (currentToken !== null) {
            this.routerExtensions
                .navigate(["/home"]);
        }
    }

    socialLogin(type: string) {
        console.log('selecciono:', type);
        this.authService
            .tnsOauthLogin("facebook")
            .then((result: ITnsOAuthTokenResult) => {
                this.authService.tnsUpdateCurrentSession();
                console.log("back to login component with token " + result.accessToken);
                this.routerExtensions
                    .navigate(["/home"]);
                    /*.then(() => console.log("navigated to /home"))
                    .catch(err => console.log("error navigating to /home: " + err));*/
            })
            .catch(e => this.handleLoginError(e));
    }

    handleLoginError(e) {
        console.log("Error: " + e);
        this.authService.tnsDestroyCurrentSession();
    }

}
