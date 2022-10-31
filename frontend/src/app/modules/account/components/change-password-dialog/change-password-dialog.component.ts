import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems, IUser } from 'src/app/models/data-models';
import { DxUtils } from 'src/dx.utils';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('form') form!: DxFormComponent
  formItems!: IDxFormItems
  formData: any = {}
  
  @Input() data!: IUser
  constructor() { }

  ngOnInit(): void {
    this.initFormItems()
  }

  initFormItems() {
    this.formItems = [ 
      {
        editorType: 'dxTextBox',
        dataField: 'current_password',
        label: { text: 'Current password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password',  
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'new_password',
        label: { text: 'New password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password',  
          onValueChanged: (e: any) => {
            if (this.form.instance.getEditor("confirm_passowrd")?.option("value")) {
              if (e.value !== this.form.instance.getEditor("confirm_passowrd")?.option("value"))
                this.form.instance.getEditor("confirm_passowrd")?.option("validationStatus", "invalid")
              else this.form.instance.getEditor("confirm_passowrd")?.option("validationStatus", "valid")
            }
          }
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'confirm_passowrd',
        label: { text: 'Confirm new password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password', 
          onValueChanged: (e: any) => {
            if (this.form.instance.getEditor("new_password")?.option("value")) {
              if (e.value !== this.form.instance.getEditor("new_password")?.option("value"))
                this.form.instance.getEditor("confirm_passowrd")?.option("validationStatus", "invalid")
              else this.form.instance.getEditor("confirm_passowrd")?.option("validationStatus", "valid")
            }
          } 
        },
        validationRules: [DxUtils.requiredRule()],
      },
    ]
  }

  add = (e: any) => {
    if (this.form.instance.validate().isValid) {
      delete this.formData['confirm_passowrd']
      this.onCloseEvent.emit(this.formData);
      this.initFormItems();
    }
  }

  dismiss = (e: any) => {
    this.onCloseEvent.emit(null);
    this.initFormItems();
  }

}
