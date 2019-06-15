import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {LoginComponent} from "~/app/modules/shared/login/login.component";
import {NativeScriptRouterModule} from "nativescript-angular";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import { OtpComponent } from './otp/otp.component';
import { MenuLayoutComponent } from './menu-layout/menu-layout.component';
import {HeaderComponent} from "~/app/modules/shared/header/header.component";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        LoginComponent,
        OtpComponent,
        MenuLayoutComponent,
        HeaderComponent,
    ],
    exports: [
        LoginComponent,
        OtpComponent,
        MenuLayoutComponent,
        HeaderComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {
}
