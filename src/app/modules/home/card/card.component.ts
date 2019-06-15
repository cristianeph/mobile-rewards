import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "~/app/classes/interfaces/user-interface";
import {RewardsService} from "~/app/classes/services/rewards-service";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";

@Component({
    selector: 'ns-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    moduleId: module.id,
})
export class CardComponent implements OnInit {
    @Output() onClientLevel: EventEmitter<IClientLevel> = new EventEmitter();
    @Input() user: IUser;
    clientLevel: IClientLevel;

    constructor(private rewardsService: RewardsService) {
    }

    ngOnInit() {
        this.getCardData();
    }

    getCardData() {
        /*Usuario de prueba temporal*/
        /*this.user = {
            id: 123,
            apellidos: '',
            cellphone: '',
            nombres: '',
            secret: ''
        };*/
        if (this.user) {
            /*Se obtiene el nivel del usuario logueado*/
            this.rewardsService.getLevel(this.user).subscribe(
                result => {
                    console.log('exito', result);
                    this.clientLevel = result;
                    this.onClientLevel.emit(this.clientLevel);
                },
                error => {
                    console.error(error);
                }
            )
        }
    }

    getPointsAccumlated() {
        if (this.clientLevel) {
            return `${this.clientLevel.puntos} Puntos`
        }
    }

    getCardHolder() {
        if (this.clientLevel) {
            return this.clientLevel.nombre;
        } else {
            return '...';
        }
    }

    getCardLevelName() {
        if (this.clientLevel) {
            return this.clientLevel.socio;
        } else {
            return '...';
        }
    }

    getAmountEarn() {
        if (this.clientLevel) {
            return `Su avance del mes es S/ ${this.clientLevel.avance}`;
        } else {
            return '...';
        }
    }

    getAmountNeeded() {
        if (this.clientLevel) {
            return `Para subir de nivel necesita S/ ${this.clientLevel.cuota_subir}, mantenga su cuota de S/ ${this.clientLevel.cuota_mantener}`;
        } else {
            return '...';
        }
    }

    getCardLevel() {
        if (this.clientLevel) {
            if (this.clientLevel.socio === 'Oro') {
                return 'card-wrapper gold';
            }
            if (this.clientLevel.socio === 'Plata') {
                return 'card-wrapper silver';
            }
            if (this.clientLevel.socio === 'Bronce') {
                return 'card-wrapper bronze';
            }
        } else {
            return 'card-wrapper';
        }
    }

}
