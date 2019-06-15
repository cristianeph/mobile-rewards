import {Injectable} from "@angular/core";
import {
    TnsOAuthClient,
    ITnsOAuthTokenResult
} from "nativescript-oauth2";
import {IUser} from "~/app/classes/interfaces/user-interface";


@Injectable()
export class AuthenticationService {
    public currentSession: ITnsOAuthTokenResult = null;
    private client: TnsOAuthClient = null;
    private currentUser: IUser;

    constructor() {
    }

    public setCurrentUser(user: IUser) {
        this.currentUser = user;
    }

    public getCurrentUser() {
        return this.currentUser;
    }

    public tnsDestroyCurrentSession() {
        this.currentSession = null;
    }

    public tnsUpdateCurrentSession() {
        this.currentSession = this.tnsCurrentSession();
    }

    public tnsCurrentSession() {
        return this.client.tokenResult;
    }

    public tnsOauthRefresh() {
        return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
            this.client.refreshTokenWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
                if (error) {
                    console.error("Unable to refresh token with error: ");
                    console.error(error);
                    reject(error);
                } else {
                    console.log("Successfully refreshed access token: ");
                    console.log(tokenResult);
                    resolve(tokenResult);
                }
            });
        });
    }

    public tnsOauthLogin(providerType): Promise<ITnsOAuthTokenResult> {
        this.client = new TnsOAuthClient(providerType);

        return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
            this.client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
                    if (error) {
                        console.error("back to main page with error: ");
                        console.error(error);
                        reject(error);
                    } else {
                        console.log("back to main page with access token: ");
                        console.log(tokenResult);
                        resolve(tokenResult);
                    }
                }
            );
        });
    }

    public tnsOauthLogout() {
        if (this.client) {
            this.client.logout();
        }
    }
}