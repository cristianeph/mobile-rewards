import {Component, Input, OnInit} from '@angular/core';
import {IProduct, IProductAvailability} from "~/app/classes/interfaces/products-interface";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";

@Component({
  selector: 'ns-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  moduleId: module.id,
})
export class ProductComponent implements OnInit {
  @Input() product: IProductAvailability;
  @Input() level: IClientLevel;
  constructor() { }

  ngOnInit() {
  }

  isExclusive() {
    if (this.product) {
      return this.product.cod_cliente === 'Todos' ? 'collapsed' : 'visible'
    }
  }

  getExclusivity() {
    if (this.level) {
      let posible = [String(this.level.cod_cliente), 'Oro', 'Plata', 'Bronce'];
      if (this.product) {
        let coincidence = posible.find(item => item === this.product.cod_cliente);
        return `Exclusivo ${coincidence === posible[0] ? 'para Usted' : `para ${coincidence}`}`;
      }
    }
  }

}
