import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity.model';
import { User } from 'src/app/shared/models/user.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivitiesFavoritesService } from '../../services/activities-favorites.service';

@Component({
  selector: 'app-activities-details',
  templateUrl: './activities-details.component.html',
  styleUrls: ['./activities-details.component.css']
})
export class ActivitiesDetailsComponent implements OnInit {

  public title: String = 'Activity Details';
  public activity: Activity;
  public user: User;
  public favorite: boolean;

  constructor(private us: UserService, private as: ActivitiesService, private favService: ActivitiesFavoritesService) { }

  ngOnInit(): void {
    this.user = this.us.userLoggedIn;
    this.as.activityToShowRefreshed().subscribe(
      () => {
        this.activity = this.as.activityToShow;
        this.favorite = this.favService.isFavorite(this.activity);
        this.checkStatus();
      }
    )
  }

  checkStatus() {
    if (this.activity.state != 'Cancelled') {
      if (this.activity.maxCapacity - this.activity.participatingUsers.length <= 0) {
        this.activity.state = 'Complete';
      }
      else {
        this.activity.state = 'Available';
      }
    }
  }

  toggleFavorite() {
    this.favorite = this.favService.toggleFavorite(this.activity);
  }

  signUp() {
    this.activity.participatingUsers.push(this.user.id);
    this.checkStatus();
    this.as.updateActivity(this.activity).subscribe(
      () => console.log(`User ${this.user.email} succesfully signed up for activity ${this.activity.id}`)
    );
  }

  signOut() {
    this.activity.participatingUsers.splice(this.activity.participatingUsers.findIndex(e => e === this.user.id), 1);
    this.checkStatus();
    this.as.updateActivity(this.activity).subscribe(
      () => console.log(`User ${this.user.email} succesfully signed out of activity ${this.activity.id}`)
    );
  }

}
