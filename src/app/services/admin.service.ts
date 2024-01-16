import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:44330/api/admin';

  constructor(
    private http: HttpClient,
    ) { }

  addNewJob(jobData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/add-new-job`, jobData);
  }

  deleteJob(jobId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-job/${jobId}`);
  }


  deleteUser(userId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-user/${userId}`);
  }

  changeUserRole(userId: number, newRoleId: number): Observable<any> {
    const body = { userId, newRoleId };

    return this.http.post(`${this.apiUrl}/change-user-role`, body);
  }

  approveScheduleRequest(scheduleId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-schedule-request?scheduleId=${scheduleId}`, null);
  }

  deleteSchedule(scheduleId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-schedule/${scheduleId}`);
  }
}