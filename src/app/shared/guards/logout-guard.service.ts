import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: "root",
})
export class LogoutGuardService implements CanActivate {
    constructor(private userService: UserService) { }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        return this.userService.userLoggedIn !== undefined ? true : false
    }
}
