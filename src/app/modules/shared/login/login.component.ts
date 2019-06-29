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
        /*Se valida si el usuario actual tiene el token sin
        vencer, si fuera asi se le re dirige al home*/
        let currentToken = this.authService.currentSession;
        /*console.log('token actual: ', currentToken);*/
        if (currentToken !== null) {
            this.routerExtensions
                .navigate(["/home"]);
        }
    }

    socialLogin(type: string) {
        /*@ToDo Por el momento esta facebook, falta gmail*/
        /*Se accede al provider de autenticacion oauth2*/
        /*console.log('selecciono:', type);*/
        this.authService
            .tnsOauthLogin("facebook")
            .then((result: ITnsOAuthTokenResult) => {
                this.authService.tnsUpdateCurrentSession();
                console.log("back to login component with token " + result.accessToken);
                this.routerExtensions
                    .navigate(["/otp"]);
            })
            .catch(e => this.handleLoginError(e));
    }

    handleLoginError(e) {
        /*En caso de cualquier error durante la validacion de la autenticacion
        se destruye cualquier dato de usuario previamente ingresado*/
        console.log("Error: " + e);
        this.authService.tnsDestroyCurrentSession();
    }

}
