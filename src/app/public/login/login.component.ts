import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', 
  [Validators.required, Validators.email]
  );

  constructor(){

  }

  ngOnInit(): void {
    
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir o email!'
    }
    return this.email.hasError('email') ? 'Formato de email inválido' : '';
  }

}
