import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUser, IUserValidation} from "~/app/classes/interfaces/user-interface";

@Injectable()
export class ValidationService {
    private check_cellphone: string = 'http://52.0.140.84:8080/rewards/user/validatecellphone';
    private check_secret: string = 'http://52.0.140.84:8080/rewards/user/validateuser';

    constructor(private http: HttpClient) {
    }

    checkCellphone(cellphone: string) {
        return this.http.get<IUserValidation>(`${this.check_cellphone}/${cellphone}/`);
    }

    checkSecret(validation: IUserValidation) {
        return this.http.post<IUser>(`${this.check_secret}/`, validation);
    }
}