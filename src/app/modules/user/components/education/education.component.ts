import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Education } from 'src/app/shared/models/education.model';
import { NATIONALITIES } from '../../../../shared/constants/nationalities.constant';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { nifValidator } from '../../../../shared/validators/nif.validator';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public title: string = 'Education';
  public user: User;
  public educationForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.us.userLoggedIn;
  }

  createEducation() {
    this.router.navigate(['/user/education']);
  }

  updateEducation(i: number, e: Education) {
    this.router.navigate(['/user/education', i]);
    console.log('update education:', i, e);
  }

  deleteEducation(i: number) {
    if (confirm('You are about to delete an education record. Are you sure?')) {
      this.user.education.splice(i, 1);
      this.us.updateUser(this.user).subscribe(
        () => console.log(`Education ${i} deleted`)
      );
    }
  }

}
