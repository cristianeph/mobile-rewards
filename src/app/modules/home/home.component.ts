import { Component, OnInit } from "@angular/core";
import {AuthenticationService} from "~/app/classes/services/authentication-service";
import {IUser} from "~/app/classes/interfaces/user-interface";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";
import {RewardsService} from "~/app/classes/services/rewards-service";
import {IProduct, IProductAvailability} from "~/app/classes/interfaces/products-interface";
import {forkJoin, Observable, Subject} from 'rxjs';
import {IReward} from "~/app/classes/interfaces/reward-interface";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    user: IUser;
    clientLevel: IClientLevel;
    products: IProduct[];
    availableProducts: IProductAvailability[];
    rewards: IReward[];
    constructor(private authService: AuthenticationService,
                private rewardsService: RewardsService) {
        this.products = [];
        this.availableProducts = [];
        this.rewards = [];
    }

    ngOnInit() {
        /*@ToDo Aqui tambien deberia validarse si el token del usuario autorizado sigue vigente*/
        /*Se obtiene el usuario autorizado obtenido previamente*/
        /*let currentToken = this.authService.currentSession;
        console.log('token actual: ', currentToken);*/
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
            this.getAvailableProducts();
            this.getRewards();
        }
    }

    getRewards() {
        /*Se obtiene la lista de premios segun el nivel de cliente*/
        let level = this.rewardsService.getLevelGivenClient(this.clientLevel);
        this.rewardsService.getRewards(level).subscribe(
            result => {
                this.rewards = result;
            }, error => {
                console.error(error);
            }
        )
    }

    getAvailableProducts() {
        /*@ToDo Se deberia cambiar la forma en la que se obtiene la lista completa de productos*/
        /*Se valida la lista de productos disponibles vs la disponibilidad*/
        this.products = this.rewardsService.getProducts();
        forkJoin(
            this.rewardsService.getProductRequests()
        ).subscribe(
            response => {
                let disponible_normal = [];
                let disponible_especifico = [];
                this.products.forEach((item, index) => {
                    let disponibilidad: IProductAvailability[] = response[index];
                    let normal = disponibilidad.find(item => item.cod_cliente === 'Todos');
                    let especifico = disponibilidad.find(item => item.cod_cliente === String(this.user.id));
                    if (normal !== undefined) {
                        disponible_normal.push(normal);
                    }
                    if (especifico !== undefined) {
                        disponible_especifico.push(especifico);
                    }
                });
                this.availableProducts = disponible_especifico.concat(disponible_normal)
            }
        );

    }
}
