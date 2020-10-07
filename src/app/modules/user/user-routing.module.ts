import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';

import { LoginGuardService } from '../../shared/guards/login-guard.service';
import { LogoutGuardService } from '../../shared/guards/logout-guard.service';
import { PersonalDataGuard } from '../../shared/guards/personal-data-guard.service';
import { EducationCrudComponent } from './components/education-crud/education-crud.component';
import { LanguageCrudComponent } from './components/language-crud/language-crud.component';



const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuardService] },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuardService] },
  { path: "profile", component: ProfileComponent, canActivate: [LogoutGuardService], canDeactivate: [PersonalDataGuard] },
  { path: "logout", component: LogoutComponent, canActivate: [LogoutGuardService] },
  { path: "education", component: EducationCrudComponent, canActivate: [LogoutGuardService] },
  { path: "education/:id", component: EducationCrudComponent, canActivate: [LogoutGuardService] },
  { path: "language", component: LanguageCrudComponent, canActivate: [LogoutGuardService] },
  { path: "language/:id", component: LanguageCrudComponent, canActivate: [LogoutGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonalDataGuard]
})
export class UserRoutingModule { }
