import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import DevExpress from "devextreme";
import notify from 'devextreme/ui/notify';
import { dxToolbarItem } from 'devextreme/ui/toolbar';
import { IUser } from 'src/app/models/data-models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Utils } from 'src/app/modules/utils';
import { UserService } from '../../services/user.service';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  columns: DevExpress.ui.dxDataGridColumn[] = []
  toolbarItems: dxToolbarItem[] = []
  dataSource: IUser[] = []
  wordWrapEnabled: boolean = true
  showColumnLines: boolean = true
  addEmployeeDialog: boolean = false
  orgId: string | undefined 
  currentUserId!: string
  selectedUser!: IUser | null 

  constructor(
    protected user: UserService,
    protected auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.user.getUserId()
    this.loadData()
    this.initTableParams()
  }

  initTableParams(): void {
    this.columns = [
      {
        caption: "First Name",
        dataField: "first_name",
        dataType: "string",
        width: "150px",
      },
      {
        caption: "Last Name",
        dataField: "last_name",
        dataType: "string",
        width: "150px",
      },
      {
        caption: "Position",
        dataField: "position",
        dataType: "string",
        width: "100px",
      },
      {
        caption: "Access level",
        dataField: "access_level",
        dataType: "string",
        width: "150px",
      },
      {
        caption: "Email",
        dataField: "email",
        dataType: "string",
      },
      {
        caption: "Mobile number",
        dataField: "tel",
        dataType: "string",
      },
      {
        type:'buttons',
        alignment: 'center',
        visible: this.user.isMaximumUser(),
        buttons: [
          {
            icon: 'edit',
            onClick: (e: any): void => {
              this.addEmployeeDialog = true
              this.selectedUser = e.row.data
              console.log(e.row.data)
            },
            disabled: (e: any): boolean => {
              if (e.row.data._id === this.currentUserId) {
                return true
              }
              return false
            }
          },
          {
            icon: 'trash',
            onClick: (e: any): void => {
              const result = confirm(
                "<i>Are you sure you want to delete this record?</i>", "Confirm"
              )

              result.then((dialogResult) => {
                if (dialogResult) {
                  this.deleteUser(e.row.data._id)
                }
              })
            },
            disabled: (e: any): boolean => {
              if (e.row.data._id === this.currentUserId) {
                return true
              }
              return false
            }
          },
        ]
      }
    ]

    this.toolbarItems = [
      {
        text: 'Employees of your organisation',
        location: 'before'
      },
      {
        widget: 'dxButton',
        location: 'after',
        options: {
          visible: this.user.isMediumUser(),
          disabled: this.orgId ? false : true,
          icon: 'add',
          hint: 'Add a new employee',
          onClick: (e: any) => {
            this.addEmployeeDialog = true
          }
        }
      }
    ]
  }


  onToolbarPreparing(e: any): void {
    e.toolbarOptions.items.push(...this.toolbarItems)
  }

  loadData(): void {
    this.orgId = this.user.getOrganisationId()
    if (this.orgId) {
      this.user.getEmployees(this.orgId).subscribe(
        (res) => {
          this.dataSource = res
        },
        (err: HttpErrorResponse) => {
          if (err.error.message === 'Access token has been expired')
            Utils.tokenExpiredHandler()
          else notify({ message: err.error.message, type: "error", width: "auto"});
        }
      )
    }
  }

  deleteUser(id: string): void {
    this.user.removeUser(id).subscribe(
      (res) => {
        this.loadData()
        notify({ message: "User has been deleted successfully", type: "error", width: "auto"});
      },
      (err: HttpErrorResponse) => {
        if (err.error.message === 'Access token has been expired')
          Utils.tokenExpiredHandler()
        else notify({ message: err.error.message, type: "error", width: "auto"});
      }
    )
  }

  closeAddEmployeeDialog(e: any): void {
    this.addEmployeeDialog = false
    if (e) {
      if (e.editing) 
        this.updateUser(e.formData)
      else this.createUser(e.formData)
    }
    else if (!this.orgId) notify({ message: "Firstly add an Organisation", type: "error", width: "auto"});
    this.selectedUser = null
  }

  createUser(user: IUser): void {
    const dashId = this.user.getDashboardId()

    if (this.orgId && dashId) {
      this.auth.registerByAdmin(dashId, this.orgId, user).subscribe(
        (res) => {
          this.loadData()
        },
        (err: HttpErrorResponse) => {
          if (err.error.message === 'Access token has been expired')
            Utils.tokenExpiredHandler()
          else notify({ message: err.error.message, type: "error", width: "auto"});
        }
      )
    }
    else notify({ message: "Unexpected error", type: "error", width: "auto"});
  }

  updateUser(user: IUser): void {
    if (this.orgId) {
      this.user.update(user).subscribe(
        (res) => {
          this.loadData()
        },
        (err: HttpErrorResponse) => {
          if (err.error.message === 'Access token has been expired')
            Utils.tokenExpiredHandler()
          else notify({ message: err.error.message, type: "error", width: "auto"});
        }
      )
    }
  }



}
