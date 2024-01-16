import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';
import * as jwt_decode from "jwt-decode";
import { Schedule } from '../interfaces/schedule';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44330/api/user';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getJobOptions(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<string>(`${this.apiUrl}/login`, userData, 
    {headers, responseType: 'text' as 'json'});
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getRoleId(): string | null {
    return localStorage.getItem('roleId');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); //delete userId from local storage too

    localStorage.removeItem('roleId');

    this.router.navigate(['/login'])
  }

  getDashboard(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.apiUrl}/dashboard`);
  }
}