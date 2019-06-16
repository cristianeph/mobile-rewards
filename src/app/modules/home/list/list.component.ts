import {Component, Input, OnInit} from '@angular/core';
import {IProductAvailability} from "~/app/classes/interfaces/products-interface";
import {IReward} from "~/app/classes/interfaces/reward-interface";
import {forkJoin} from "rxjs";
import {AuthenticationService} from "~/app/classes/services/authentication-service";
import {RewardsService} from "~/app/classes/services/rewards-service";
import {IUser} from "~/app/classes/interfaces/user-interface";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";

@Component({
    selector: 'ns-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    moduleId: module.id,
})
export class ListComponent implements OnInit {
    products: IProductAvailability[];
    rewards: IReward[];
    user: IUser;
    level: IClientLevel;
    loading: boolean;

    constructor(private authService: AuthenticationService,
                private rewardsService: RewardsService) {
        this.products = [];
        this.rewards = [];
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        /*Usuario de prueba temporal*/
        /*this.user = {
            id: 123,
            apellidos: '',
            cellphone: '',
            nombres: '',
            secret: ''
        };*/
        this.getUserInfo();
    }

    getUserInfo() {
        if (this.user) {
            /*Se obtiene el nivel del usuario logueado*/
            this.rewardsService.getLevel(this.user).subscribe(
                result => {
                    this.level = result;
                    this.getRewards();
                    this.getProducts();
                },
                error => {
                    console.error(error);
                }
            )
        }
    }

    getRewards() {
        /*Se obtiene la lista de premios segun el nivel de cliente*/
        let level = this.rewardsService.getLevelGivenClient(this.level);
        this.rewardsService.getRewards(level).subscribe(
            result => {
                this.rewards = result;
                console.log('exito premios', result.length);
            }, error => {
                console.error(error);
            }
        )
    }

    getProducts() {
        /*@ToDo Se deberia cambiar la forma en la que se obtiene la lista completa de productos*/
        /*Se valida la lista de productos disponibles vs la disponibilidad*/
        this.loading = true;
        let everything = this.rewardsService.getProducts();
        forkJoin(
            this.rewardsService.getProductRequests()
        ).subscribe(
            response => {
                console.log('exito productos', response.length);
                let disponible_especifico = [];
                let disponible_nivel = [];
                let disponible_normal = [];
                everything.forEach((item, index) => {
                    let disponibilidad: IProductAvailability[] = response[index];
                    /*@ToDo se puede mejorar el algoritmo*/
                    /*validando disponibilidad del producto*/
                    let especifico = disponibilidad.find(item => item.cod_cliente === String(this.user.id));
                    let nivel = disponibilidad.find(item => item.cod_cliente === this.level.socio);
                    let normal = disponibilidad.find(item => item.cod_cliente === 'Todos');
                    if (especifico !== undefined && this.isOnProductList(disponible_especifico, especifico)) {
                        disponible_especifico.push(especifico);
                    } else if (nivel !== undefined && this.isOnProductList(disponible_nivel, nivel)) {
                        disponible_nivel.push(nivel);
                    } else if (normal !== undefined && this.isOnProductList(disponible_normal, normal)) {
                        disponible_normal.push(normal);
                    }
                });
                this.loading = false;
                this.products = disponible_especifico.concat(disponible_nivel).concat(disponible_normal)
            }, error => {
                this.loading = false;
                console.error(error);
            }
        );
    }

    isOnProductList(list: IProductAvailability[], object: IProductAvailability) {
        let exist = list.find(item => item.cod_producto === object.cod_producto);
        return !(exist !== undefined);
    }

    isFieldOn(field: string) {
        /*funciones para validar visualizacion de elementos*/
        if (field === 'list') {
            return (this.loading === false) ? 'visible' : 'collapsed';
        }
        if (field === 'loading') {
            return (this.loading === false) ? 'collapsed' : 'visible';
        }
    }

    getListHeight(list: any[]) {
        let residue = list.length % 2;
        let height = 300 * ((residue === 0) ? list.length : Math.ceil(list.length / 2));
        return height;
    }

}
