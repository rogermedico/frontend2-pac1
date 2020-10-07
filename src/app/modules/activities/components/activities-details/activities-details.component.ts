import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activities-details',
  templateUrl: './activities-details.component.html',
  styleUrls: ['./activities-details.component.css']
})
export class ActivitiesDetailsComponent implements OnInit {

  public title: String = 'Activity Details';
  public activity: Activity;

  constructor(private us: UserService, private as: ActivitiesService) { }

  ngOnInit(): void {
    this.as.activityToShowRefreshed().subscribe(
      () => {
        this.activity = this.as.activityToShow;
        if ((this.activity.state == 'Available') && (this.activity.maxCapacity - this.activity.participatingUsers.length <= 0)) {
          this.activity.state = 'Complete';
        }
      }
    )
  }

  addFavorite() {

  }

  signUpActivity() {

  }

}
