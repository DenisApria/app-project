import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WorkerComponent } from './components/worker/worker.component';
import { AdminGuard } from './guards/admin.guard';
import { WorkerGuard } from './guards/worker.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'worker', component: WorkerComponent, canActivate:[WorkerGuard]},
  {path:'admin', component: AdminComponent, canActivate:[AdminGuard]},

  {path:'', redirectTo: '/login', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
