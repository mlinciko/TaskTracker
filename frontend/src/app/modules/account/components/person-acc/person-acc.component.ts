import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { finalize } from 'rxjs';
import { IUser } from 'src/app/models/data-models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/account/services/user.service';

@Component({
  selector: 'app-person-acc',
  templateUrl: './person-acc.component.html',
  styleUrls: ['./person-acc.component.scss']
})
export class PersonAccComponent implements OnInit {
  editPersonDialog: boolean = false
  user!: IUser
  loading: boolean = false

  constructor(
    protected auth: AuthService,
    protected userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  openEditDialog(): void {
    this.editPersonDialog = true
  }

  getUser(): void {
    this.loading = true
    if (this.auth.checkToken()) {
      this.userService.getUserByToken()
      .pipe(finalize(() => this.loading= false))
      .subscribe(
        (res) => {
          if (res.status) {
            this.user = res.user
          }
        },
        (err: HttpErrorResponse) => {
          notify({ message: err, type: "error", width: "auto"});
        }
      )
    }
  }

  closeDialog(e: any): void {
    this.editPersonDialog = false
    if (e)
      this.updateUser(e)
  }

  updateUser(user: IUser): void {
    this.userService.update(user).subscribe(
      (res: {user: IUser}) => {
        this.user = res.user
      },
      (err: HttpErrorResponse) => {
        notify({ message: err.error.message, type: "error", width: "auto"});
      }
    )
  }

}
