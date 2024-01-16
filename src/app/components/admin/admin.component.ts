import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/interfaces/job';
import { User } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  newJobForm!: FormGroup;
  deleteJobForm!: FormGroup;
  deleteUserForm!: FormGroup;
  changeUserRoleForm!: FormGroup;
  approveScheduleForm!: FormGroup;
  deleteScheduleForm!: FormGroup;

  jobs: Job[] = [];
  users: User[] = [];

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchJobs();
    this.fetchUsers();
  }


  createForm(): void {
    this.newJobForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.deleteJobForm = this.fb.group({
      jobId: [null, Validators.required],
    });

    this.deleteUserForm = this.fb.group({
      userId: [null, Validators.required],
    });

    this.changeUserRoleForm = this.fb.group({
      userId: [null, Validators.required],
      newRoleId: [null, Validators.required],
    });

    this.approveScheduleForm = this.fb.group({
      scheduleId: [null, Validators.required],
    });

    this.deleteScheduleForm = this.fb.group({
      scheduleId: [null, Validators.required],
    });
  }

  logOut() {
    this.userService.logOut();
  }

  addNewJob() {
    if (this.newJobForm.valid) {
      const jobData = {
        title: this.newJobForm.value.name,
      };
  
      this.adminService.addNewJob(jobData).subscribe({
        next: (response) => {
          console.log('New job added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding new job:', error);
        }
      });
    }
  }

  jobNotFoundError: boolean = false;
  deleteJob() {
    if (this.deleteJobForm.valid) {
      const jobId = this.deleteJobForm.value.jobId;

      this.jobNotFoundError = false;
  
      this.adminService.deleteJob(jobId).subscribe({
        next: (response) => {
          console.log('Job deleted successfully:', response);
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Error deleting job:', error);
            this.jobNotFoundError = true;
          } else {
            console.error('Error deleting job:', error);
          }
        }
      });
    }
  }

  userNotFoundError: boolean = false;
  deleteUser() {
    if (this.deleteUserForm.valid) {
      const userId = this.deleteUserForm.value.userId;

      this.userNotFoundError = false;

      this.adminService.deleteUser(userId).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Error deleting user:', error);
            this.userNotFoundError = true;
          } else {
            console.error('Error deleting User:', error);
          }
        }
      });
    }
  }

  changeUserRole() {
    if (this.changeUserRoleForm.valid) {
      const userId = this.changeUserRoleForm.value.userId;
      const newRoleId = this.changeUserRoleForm.value.newRoleId;

      this.userNotFoundError = false;

      this.adminService.changeUserRole(userId, newRoleId).subscribe({
        next: (response) => {
          console.log('Role changed successfully:', response);
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Error changing role:', error);
            this.userNotFoundError = true;
          } else {
            console.error('Error changing role:', error);
          }
        }
      });
    }
  }

  approveSchedule() {
    if (this.approveScheduleForm.valid) {
      const scheduleId = this.approveScheduleForm.value.scheduleId;
  
      this.adminService.approveScheduleRequest(scheduleId).subscribe({
        next: (response) => {
          console.log('Schedule request approved successfully:', response);
        },
        error: (error) => {
          console.error('Error approving schedule request:', error);
        }
      });
    }
  }

  deleteSchedule() {
    if (this.deleteScheduleForm.valid) {
      const scheduleId = this.deleteScheduleForm.value.scheduleId;

      this.adminService.deleteSchedule(scheduleId).subscribe({
        next: (response) => {
          console.log('Schedule deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error deleting schedule:', error);
        }
      });
    }
  }

  fetchJobs(): void {
    this.userService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobs = response;
      },
      error: (error) => {
        console.error('Error fetching job options:', error);
      }
    });
  }
  
  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('Users:', response);
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}