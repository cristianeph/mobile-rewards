import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SharedModule} from "./modules/shared/shared.module";
import {AuthenticationService} from "./classes/services/authentication-service";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        AppRoutingModule,
        SharedModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthenticationService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
