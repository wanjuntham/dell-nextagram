import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { UserService } from '../user.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('mxchan@gmail.com'),
    password: new FormControl('12345678'),
  })

  constructor(private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.userService.submitLogin(this.loginForm.value)
  }
}
