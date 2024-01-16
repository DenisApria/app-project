import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ){}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
  });
  }

  Login(){
    if(this.loginForm.valid){
      const userData = this.loginForm.value;
      this.userService.logInUser(userData).subscribe({
        next:(response: any) => {
          console.log('logged in successfully: ',response);
          const jwtToken = response;
          localStorage.setItem('token', jwtToken);

          const decodedToken= this.decodeToken(jwtToken);
          const role= decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          // this.router.navigate(['/worker']);
          
          //I added userId decoding
          const userId = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

          const roleId = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          
          if (userId) {
            localStorage.setItem('userId', userId); // Store the user ID
          } else {
            console.error('User ID not found in the token.');
          }

          if (roleId) {
            localStorage.setItem('roleId', roleId); // Store the user ID
          } else {
            console.error('Role ID not found in the token.');
          }


          if(role==='1'){
            this.router.navigate(['/admin']);
          }else if(role=== '2'){
            this.router.navigate(['/worker']);
          }
          else{
            console.log('Login failed. Please check your credentials', 'Error');
          }
        },
        error:(error) =>{
          console.log('login failed: ',error);
          this.loginError = true;
        }
      })
    }
  }

  private decodeToken(token: string): any{
    try{
      return JSON.parse(atob(token.split('.')[1]));
    }catch(e){
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
