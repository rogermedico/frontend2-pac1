import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity.model';
import { User } from 'src/app/shared/models/user.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  public title: String = 'Activities List';
  public activities: Activity[];
  public user: User;

  constructor(private us: UserService, private as: ActivitiesService) { }

  ngOnInit(): void {

    this.user = this.us.userLoggedIn;
    if (!this.user) {
      this.as.getActivities().subscribe(
        (act) => this.activities = act
      );
    }
    else {
      this.activities = this.as.activities;
    }
  }

  showDetails(ac: Activity) {
    this.as.activityToShow = ac;
    this.as.activityToShowRefreshed().next();
  }

}
