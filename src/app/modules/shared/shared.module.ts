import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {LoginComponent} from "~/app/modules/shared/login/login.component";
import {NativeScriptRouterModule} from "nativescript-angular";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import { OtpComponent } from './otp/otp.component';

@NgModule({
    declarations: [
        LoginComponent,
        OtpComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        NativeScriptRouterModule
    ],
    exports: [
        LoginComponent,
        OtpComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {
}
