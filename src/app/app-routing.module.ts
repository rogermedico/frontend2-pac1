import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutGuardService } from './shared/guards/logout-guard.service';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  //{ path: "", redirectTo: "HomeComponent", pathMatch: "full" },
  { path: '', component: HomeComponent },
  { path: 'favorites', component: HomeComponent, canActivate: [LogoutGuardService] },
  { path: 'myactivities', component: HomeComponent, canActivate: [LogoutGuardService] },
  {
    path: 'user',
    loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule),
  },
  {
    path: 'activities',
    loadChildren: () => import("./modules/activities/activities.module").then((m) => m.ActivitiesModule),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
