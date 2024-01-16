import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job';
import { Schedule } from 'src/app/interfaces/schedule';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weekDayDates: Date[] = [];
  schedules: Schedule[] = [];
  userRole: number = 0;

  users: User[] = [];
  jobOptions: Job[] = [];
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchJobOptions();
    this.populateWeekDayDates();
    this.fetchSchedules();
    this.getUserRole();
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

  fetchSchedules(): void {
    this.userService.getDashboard().subscribe({
      next: (response) => {
        console.log('Schedules:', response);
        this.schedules = response;
      },
      error: (error) => {
        console.error('Error fetching schedules:', error);
      }
    });
  }

  getUserRole(): void {
    const roleId = this.userService.getRoleId();
    if (roleId) {
      this.userRole = +roleId; // Convert roleId to a number
    }
  }

  populateWeekDayDates(): void {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Get the current day index (0 for Sunday, 1 for Monday, etc.)
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay); // Set to the beginning of the current week
    for (let i = 0; i < this.weekDays.length; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      this.weekDayDates.push(date);
    }
  }

  changeWeek(weekOffset: number): void {
    const currentDate = this.weekDayDates[0];
    currentDate.setDate(currentDate.getDate() + 7 * weekOffset);

    // Repopulate weekDayDates based on the updated currentDate
    this.weekDayDates = [];
    for (let i = 0; i < this.weekDays.length; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      this.weekDayDates.push(date);
    }
  }

  getShifts(jobId: number, day: Date): { schedule: Schedule | undefined; shiftType: string; isApproved: boolean }[] {
    const shifts = this.schedules.filter(
      (schedule) =>
        schedule.jobId === jobId &&
        this.isSameDay(new Date(schedule.startTime), day)
    );

    return shifts.map((shift) => {
      const startHour = new Date(shift.startTime).getHours();
      const shiftType = startHour >= 4 && startHour < 16 ? 'Morning' : 'Evening';
      return { schedule: shift, shiftType, isApproved: shift.isApproved };
    });
  }
/*
  getApprovedShifts(jobId: number, day: Date): { schedule: Schedule | undefined; shiftType: string }[] {
    const shifts = this.schedules.filter(
        (schedule) =>
            schedule.jobId === jobId &&
            this.isSameDay(new Date(schedule.startTime), day) &&
            schedule.isApproved
    );

    return shifts.map((shift) => {
        const startHour = new Date(shift.startTime).getHours();
        const shiftType = startHour >= 4 && startHour < 16 ? 'Morning' : 'Evening';
        return { schedule: shift, shiftType };
    });
  }
  */

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  
}