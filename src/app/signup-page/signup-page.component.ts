import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '../user.service'
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl('mxchan'),
    email: new FormControl('mxchan@gmail.com'),
    password: new FormControl('12345678'),
  })

  constructor(private service: UserService) {}

  ngOnInit() {}

  onSubmit() {
    const data = this.signupForm.value
    this.service.submitSignUp(data)
  }
}
