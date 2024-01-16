import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private apiUrl = 'https://localhost:44330/api/worker';

  constructor(
    private http: HttpClient,
    ) { }

  addScheduleRequest(scheduleData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/add-schedule-request`, scheduleData);
  }
}
