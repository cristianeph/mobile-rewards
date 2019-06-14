import {NgModule} from "@angular/core";
import {PreloadAllModules, Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";
import {LoginComponent} from "./modules/shared/login/login.component";
import {OtpComponent} from "./modules/shared/otp/otp.component";

const routes: Routes = [
    /*{path: "", redirectTo: "/home", pathMatch: "full"},*/
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "otp", component: OtpComponent},
    {path: "home", loadChildren: "./modules/home/home.module#HomeModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(
        <any>routes, {preloadingStrategy: PreloadAllModules}
    )],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
