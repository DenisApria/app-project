import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {
  scheduleData: any = { date: new Date(), shift: 'morning', userId: null };

  constructor(
    private userService: UserService,
    private workerService: WorkerService,
  ) {}

  logOut() {
    this.userService.logOut();
  }

  submitScheduleRequest() {
    const userId = this.userService.getUserId();

    if (userId) {
      this.scheduleData.userId = userId;
      this.setShiftTimes();

      this.workerService.addScheduleRequest(this.scheduleData).subscribe({
        next: (response) => {
          console.log('Schedule request submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting schedule request:', error);
        },
      });
    } else {
      console.error('User ID not found.');
    }
  }

  private setShiftTimes() {
    // Assuming morning shift is from 8 AM to 4 PM
    const morningShiftStart = new Date(this.scheduleData.date);
    morningShiftStart.setHours(8, 0, 0, 0);
  
    const morningShiftEnd = new Date(this.scheduleData.date);
    morningShiftEnd.setHours(20, 0, 0, 0);
  
    // Set start and end times based on shift
    if (this.scheduleData.shift === 'morning') {
      this.scheduleData.startTime = morningShiftStart;
      this.scheduleData.endTime = morningShiftEnd;
    } else {
      // Assuming evening shift starts after morning shift
      const eveningShiftStart = new Date(this.scheduleData.date);
      eveningShiftStart.setHours(20, 0, 0, 0);
  
      const eveningShiftEnd = new Date(this.scheduleData.date);
      eveningShiftEnd.setHours(27, 59, 59, 0);
  
      this.scheduleData.startTime = eveningShiftStart;
      this.scheduleData.endTime = eveningShiftEnd;
    }
  }
}