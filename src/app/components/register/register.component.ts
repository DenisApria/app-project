import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from '../validators/passwordMatch.Validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!: FormGroup;
  jobOptions: Job[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.fetchJobOptions;
    this.createForm();
    this.fetchJobOptions();
  }

  createForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      jobId: [null, Validators.required]
    }, { validators: passwordMatchValidator });
  }

  Register(): void {
    if (this.registrationForm.valid) {
      const { confirmPassword, jobId, ...userData } = this.registrationForm.value;
      const job = jobId as Job;

      this.userService.registerUser({ ...userData, jobId: job.id }).subscribe({
        next: (response) => {
          console.log("Registration successful: ",response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Registration failed: ', error);
        }
      });
    }
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  fetchJobOptions(): void {
    this.userService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobOptions = response;
      },
      error: (error) => {
        console.error('Error fetching job options:', error);
      }
    });
  }
}
