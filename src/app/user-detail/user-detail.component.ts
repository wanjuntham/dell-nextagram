import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  images: string[] = []
  username: string

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params.userId
    this.username = this.route.snapshot.params.username
    
    this.userService.getUserImages(userId).subscribe(response => {
      this.images = response as string[]
    })
  }
}
