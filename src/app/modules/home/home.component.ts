import { Component, OnInit } from "@angular/core";
import {AuthenticationService} from "~/app/classes/services/authentication-service";
import {IUser} from "~/app/classes/interfaces/user-interface";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";
import {RewardsService} from "~/app/classes/services/rewards-service";
import {IProduct, IProductAvailability} from "~/app/classes/interfaces/products-interface";
import {forkJoin, Observable, Subject} from 'rxjs';
import {IReward} from "~/app/classes/interfaces/reward-interface";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    menu: boolean;
    user: IUser;
    clientLevel: IClientLevel;
    products: IProduct[];
    availableProducts: IProductAvailability[];
    rewards: IReward[];
    constructor(private authService: AuthenticationService,
                private rewardsService: RewardsService,
                private routerExtensions: RouterExtensions) {
        this.products = [];
        this.availableProducts = [];
        this.rewards = [];
        this.menu = false;
    }

    ngOnInit() {
        /*@ToDo Aqui tambien deberia validarse si el token del usuario autorizado sigue vigente*/
        /*Se obtiene el usuario autorizado obtenido previamente*/
        this.user = this.authService.getCurrentUser();
        /*Usuario de prueba temporal*/
        /*this.user = {
            id: 123,
            apellidos: '',
            cellphone: '',
            nombres: '',
            secret: ''
        };*/
    }

    validateClientLevel(clientLevel: IClientLevel) {
        /*Este evento se ejecuta cuando en el componente de
        la tarjeta se obtiene los datos del nivel del usuario*/
        if (clientLevel) {
            this.clientLevel = clientLevel;
        }
    }

    goRewards() {
        this.routerExtensions
            .navigate(["/home/list"]);
    }

    goProducts() {
        this.routerExtensions
            .navigate(["/home/list"]);
    }
}
