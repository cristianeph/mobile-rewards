import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "~/app/classes/services/authentication-service";
import {IUser} from "~/app/classes/interfaces/user-interface";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: 'ns-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.css'],
  moduleId: module.id,
})
export class MenuLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
  drawer: RadSideDrawer;
  user: IUser;
  constructor(private routerExtensions: RouterExtensions,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  openMenu() {
    this.drawer.showDrawer();
  }

  closeMenu() {
    this.drawer.closeDrawer();
  }

  closeSession() {
    this.authenticationService.tnsDestroyCurrentSession();
    this.routerExtensions.navigate(['/login']);
  }

}
