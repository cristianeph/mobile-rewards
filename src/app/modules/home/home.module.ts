import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";

import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {CardComponent} from './card/card.component';
import {UserComponent} from './user/user.component';
import {InfoComponent} from "~/app/modules/home/info/info.component";
import {SharedModule} from "~/app/modules/shared/shared.module";
import {ProductComponent} from './product/product.component';
import {RewardComponent} from './reward/reward.component';
import {ListComponent} from './list/list.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        CardComponent,
        UserComponent,
        InfoComponent,
        ProductComponent,
        RewardComponent,
        ListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule {
}
