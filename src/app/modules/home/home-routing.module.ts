import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {HomeComponent} from "./home.component";
import {UserComponent} from "~/app/modules/home/user/user.component";
import {InfoComponent} from "~/app/modules/home/info/info.component";
import {ListComponent} from "~/app/modules/home/list/list.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "list", component: ListComponent},
    {path: "user", component: UserComponent},
    {path: "info", component: InfoComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule {
}
