import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { IUser } from 'src/app/models/data-models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/account/services/user.service';
import { Utils } from 'src/app/modules/utils';

@Component({
  selector: 'app-person-acc',
  templateUrl: './person-acc.component.html',
  styleUrls: ['./person-acc.component.scss']
})
export class PersonAccComponent implements OnInit {
  editPersonDialog: boolean = false
  changePasswordDialog: boolean = false
  user!: IUser | null
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

  openChangePassword(): void {
    this.changePasswordDialog = true
  }

  getUser(): void {
    this.user = this.userService.getUser()
  }

  closeEditPersonDialog(e: any): void {
    this.editPersonDialog = false
    if (e)
      this.updateUser(e)
  }

  closeChangePasswordDialog(e: {current_password: string, new_password: string}): void {
    this.changePasswordDialog = false
    if (e) {
      const data = {
        user_id: this.userService.getUserId(),
        current_password: e.current_password,
        new_password: e.new_password,
      }
      this.userService.updatePassword(data)
      .subscribe(
        (res: any) => {
          notify({ message: res.message, type: "success", width: "auto"});
        },
        (err: HttpErrorResponse) => {
          notify({ message: err.error.message, type: "error", width: "auto"});
        }
      )
    }
  }

  updateUser(user: IUser): void {
    this.userService.update(user).subscribe(
      (res: IUser) => {
        this.user = res
      },
      (err: HttpErrorResponse) => {
        if (err.error.message === 'Access token has been expired')
          Utils.tokenExpiredHandler()
        else notify({ message: err.error.message, type: "error", width: "auto"});
      }
    )
  }

}
