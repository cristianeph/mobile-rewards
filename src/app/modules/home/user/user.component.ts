import {Component, OnInit} from '@angular/core';
import {IUser} from "~/app/classes/interfaces/user-interface";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";
import {AuthenticationService} from "~/app/classes/services/authentication-service";

@Component({
    selector: 'ns-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    moduleId: module.id,
})
export class UserComponent implements OnInit {
    user: IUser;
    clientLevel: IClientLevel;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        console.log('==>', this.user)
    }

    validateClientLevel(clientLevel: IClientLevel) {
        if (clientLevel) {
            this.clientLevel = clientLevel;
        }
    }

    getNames() {
        if (this.clientLevel) {
            return this.clientLevel.nombre;
        } else {
            return '...'
        }

    }

    getPoints() {
        if (this.clientLevel) {
            return `${this.clientLevel.puntos} puntos a la fecha`
        } else {
            return '...'
        }
    }

    getAmountEarn() {
        if (this.clientLevel) {
            return `Su avance del mes es S/ ${this.clientLevel.avance}`;
        } else {
            return '...';
        }
    }

    getAmountPromotion() {
        if (this.clientLevel) {
            return `Para subir de nivel este mes debe llegar a S/ ${this.clientLevel.cuota_subir}`;
        } else {
            return '...';
        }
    }

    getAmountNeeded() {
        if (this.clientLevel) {
            return `Mantenga su cuota mensual de S/ ${this.clientLevel.cuota_mantener}`;
        } else {
            return '...';
        }
    }

    getCardLevel() {
        if (this.clientLevel) {
            return `Usted esta en el nivel ${this.clientLevel.socio}`;
        } else {
            return '...';
        }
    }

}
