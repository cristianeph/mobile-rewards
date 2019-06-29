import {Component} from "@angular/core";
import {registerElement} from 'nativescript-angular';

/*registerElement('CardView', () => CardView as any);*/
registerElement("TextInputLayout", () => require("nativescript-textinputlayout").TextInputLayout);

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
}
