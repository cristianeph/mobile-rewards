import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CURRENT_LEVELS, ILevel} from "~/app/classes/interfaces/level-interface";
import {IReward} from "~/app/classes/interfaces/reward-interface";
import {CURRENT_PRODUCTS, IProduct, IProductAvailability} from "~/app/classes/interfaces/products-interface";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";
import {from} from "rxjs";
import {IUser} from "~/app/classes/interfaces/user-interface";

@Injectable()
export class RewardsService {
    private get_product_availability_url: string = 'https://blooming-falls-18368.herokuapp.com/info_puntos';
    private get_rewards_url: string = 'https://blooming-falls-18368.herokuapp.com/info_premios';
    private get_level_url: string = 'http://blooming-falls-18368.herokuapp.com/info_clientes';

    constructor(private http: HttpClient) {
    }

    getLevel(user: IUser) {
        return this.http.get<IClientLevel>(`${this.get_level_url}/${user.id}`);
    }

    getProducts() {
        return from(CURRENT_PRODUCTS);
    }

    getProductAvailabilities(product: IProduct) {
        return this.http.get<IProductAvailability[]>(`${this.get_product_availability_url}/${product.cod_producto}`);
    }

    getLevels() {
        return from(CURRENT_LEVELS);
    }

    getRewards(level: ILevel) {
        return this.http.get<IReward[]>(`${this.get_rewards_url}/${level.cod_categoria}`);
    }
}