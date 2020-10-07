import { Injectable } from "@angular/core";
import { UserService } from 'src/app/shared/services/user.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { Observable, Subject } from 'rxjs';
import { ActivitiesService } from 'src/app/shared/services/activities.service';

@Injectable({
  providedIn: "root",
})
export class ActivitiesFavoritesService {

  constructor(private us: UserService, private as: ActivitiesService) { }

  isFavorite(ac: Activity): null | boolean {
    if (!this.us.userLoggedIn) {
      return null;
    }
    else {
      const storedFavs: number[] = JSON.parse(localStorage.getItem(this.us.userLoggedIn.email));
      if (storedFavs == null) {
        return false;
      }
      else {
        if (storedFavs.findIndex(id => id === ac.id) !== -1) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

  toggleFavorite(ac: Activity, route: String): boolean {
    const storedFavs: number[] = JSON.parse(localStorage.getItem(this.us.userLoggedIn.email));

    if (storedFavs == null) {
      localStorage.setItem(this.us.userLoggedIn.email, JSON.stringify([ac.id]));
      return true;
    }
    else {
      const favFound = storedFavs.findIndex(id => id === ac.id);
      if (favFound === -1) {
        storedFavs.push(ac.id);
        localStorage.setItem(this.us.userLoggedIn.email, JSON.stringify(storedFavs));
        return true;
      }
      else {
        storedFavs.splice(favFound, 1);
        localStorage.setItem(this.us.userLoggedIn.email, JSON.stringify(storedFavs));
        return false;
      }

    }
  }


}
