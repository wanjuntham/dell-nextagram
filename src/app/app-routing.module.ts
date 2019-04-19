import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UserListComponent } from './user-list/user-list.component'
import { UserDetailComponent } from './user-detail/user-detail.component'

const routes: Routes = [
  { path: 'users/:userId/:username', component: UserDetailComponent },
  { path: '', component: UserListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
