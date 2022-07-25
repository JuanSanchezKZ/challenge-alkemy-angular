import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: any;
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  submitted = false;

  constructor(private http: HttpClient, private route: Router) {}

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (this.form.valid) {
      this.http
        .post<any>('http://challenge-react.alkemy.org/', {
          email: email,
          password: password,
        })
        .subscribe({
          next: (token) => {
            localStorage.setItem('currentUser', JSON.stringify(token));
            this.route.navigateByUrl('/');
          },
          error: (error) => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Contraseña o E-Mail incorrecto.',
            });
            this.submitted = false;
          },
        });
      this.submitted = true;
    }
  }

  ngOnInit(): void {}
}
