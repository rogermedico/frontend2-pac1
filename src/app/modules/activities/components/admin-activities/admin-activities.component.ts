import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/activity.model';
import { User } from 'src/app/shared/models/user.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.css']
})
export class AdminActivitiesComponent implements OnInit {

  public title: String = 'Edit Activities';
  public userLoggedIn: User;
  public activities: Activity[];

  constructor(private us: UserService, private as: ActivitiesService, private router: Router) { }

  ngOnInit(): void {
    this.userLoggedIn = this.us.userLoggedIn;
    this.as.getActivitiesByOwner(this.userLoggedIn.id).subscribe(
      (a) => this.activities = a
    );
  }

  createActivity() {
    this.router.navigate(['/activities/admin/new']);
  }

  updateActivity(id: number) {
    this.router.navigate(['/activities/admin/edit', id]);
  }

  deleteActivity(i: number) {
    if (confirm('You are about to delete an activity record. Are you sure?')) {
      this.activities.splice(i, 1);
      this.as.deleteActivity(i).subscribe(
        () => console.log(`Activiry ${i} deleted`)
      );
    }
  }

}
