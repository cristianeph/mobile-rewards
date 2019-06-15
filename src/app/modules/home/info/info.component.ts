import { Component, OnInit } from '@angular/core';
import {IUser} from "~/app/classes/interfaces/user-interface";
import {AuthenticationService} from "~/app/classes/services/authentication-service";
import {IClientLevel} from "~/app/classes/interfaces/client-interface";

@Component({
  selector: 'ns-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  moduleId: module.id,
})
export class InfoComponent implements OnInit {
  user: IUser;
  clientLevel: IClientLevel;

  constructor(private authService: AuthenticationService) { }

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
      return `${this.clientLevel.puntos} puntos`
    } else {
      return '...'
    }
  }

}
