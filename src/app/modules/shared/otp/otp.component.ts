import {Component, OnInit} from '@angular/core';
import {Page} from "tns-core-modules/ui/page";
import {RewardsService} from "~/app/classes/services/rewards-service";
import {TextField} from "ui/text-field";
import {ValidationService} from "~/app/classes/services/validation-service";
import {SnackBar} from 'nativescript-snackbar';
import {IUser, IUserValidation} from "~/app/classes/interfaces/user-interface";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: 'ns-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.css'],
    moduleId: module.id,
})
export class OtpComponent implements OnInit {
    snackbar: SnackBar;
    secret: IUserValidation;
    user: IUser;
    processing: boolean;
    status: boolean;

    constructor(private page: Page,
                private rewardsService: RewardsService,
                private validationService: ValidationService,
                private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.snackbar = new SnackBar();
        this.processing = false;
        this.status = false;
    }

    ngOnInit() {

    }

    checkCellphone(args) {
        this.processing = true;
        let textField = <TextField>args.object;
        let value = textField.text;
        this.validationService.checkCellphone(value).subscribe(
            result => {
                this.secret = result;
                this.processing = false;
                this.status = true;
                this.snackbar.simple('Listo');
            }, error => {
                this.processing = false;
                this.status = false;
                this.snackbar.simple('Error, este número no esta registrado');
            }
        );
    }

    checkSecret(args) {
        this.processing = true;
        let textField = <TextField>args.object;
        let value = textField.text;
        this.secret.secret = value;
        this.validationService.checkSecret(this.secret).subscribe(
            result => {
                this.user = result;
                this.processing = false;
                this.snackbar.simple('Listo');
                this.routerExtensions
                    .navigate(["/home"]);
            }, error => {
                this.processing = false;
                this.snackbar.simple('Error, el código es inválido');
            }
        )
    }

    isFieldOn(field: string) {
        if (field === 'cellphone') {
            return (this.status === false) ? 'visible' : 'collapsed';
        }
        if (field === 'secret') {
            return (this.status === false) ? 'collapsed' : 'visible';
        }
        if (field === 'form') {
            return (this.processing === false) ? 'visible' : 'collapsed';
        }
        if (field === 'loading') {
            return (this.processing === false) ? 'collapsed' : 'visible';
        }
    }

}
