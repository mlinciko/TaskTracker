import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems, IUser } from 'src/app/models/data-models';
import { Utils } from 'src/app/modules/utils';
import { DxUtils } from 'src/dx.utils';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit, OnDestroy {
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @Input() userData!: IUser | null
  @ViewChild('form') form!: DxFormComponent
  formItems!: IDxFormItems
  formData: any = {}

  editing: boolean = false
  
  constructor() { }

  ngOnInit(): void {
    this.initFormData()
    this.initFormItems()
  }

  initFormItems() {
    this.formItems = [
      {
        editorType: 'dxTextBox',
        dataField: 'first_name',
        label: { text: 'First Name', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'last_name',
        label: { text: 'Last Name', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'email',
        label: { text: 'Email', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [DxUtils.requiredRule(), DxUtils.emailRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'tel',
        label: { text: 'Telephone number', visible: false },
        editorOptions: {
          labelMode: 'floating',
        },
        validationRules:[
          {
            type: "custom",
            reevaluate: false,
            message: "Invalid telephone number",
            validationCallback: (e: any): boolean => {
              if (e.value !== '') {
                const tel = e.value;
                if (tel.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/))
                  return true;
                else return false
              }
              else return true
            },
          },
          DxUtils.requiredRule()
        ]
      },
      {
        editorType: 'dxTextBox',
        dataField: 'position',
        label: { text: 'Position', visible: false },
        editorOptions: {
          labelMode: 'floating',
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxSelectBox',
        dataField: 'access_level',
        label: { text: 'Access level', visible: false },
        editorOptions: {
          labelMode: 'floating',
          dataSource: Utils.getAccessLevelData()
        },
      },
      {
        editorType: 'dxTextBox',
        dataField: 'password',
        label: { text: 'Password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password',  
          disabled: this.editing,
          onValueChanged: (e: any) => {
            if (this.form.instance.getEditor("password_confirm")?.option("value")) {
              if (e.value !== this.form.instance.getEditor("password_confirm")?.option("value"))
                this.form.instance.getEditor("password_confirm")?.option("validationStatus", "invalid")
              else this.form.instance.getEditor("password_confirm")?.option("validationStatus", "valid")
            }
          }
        },
        validationRules: [DxUtils.requiredRule(), DxUtils.passwordLengthRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'password_confirm',
        label: { text: 'Confirm password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password', 
          disabled: this.editing,
          onValueChanged: (e: any) => {
            if (this.form.instance.getEditor("password")?.option("value")) {
              if (e.value !== this.form.instance.getEditor("password")?.option("value"))
                this.form.instance.getEditor("password_confirm")?.option("validationStatus", "invalid")
              else this.form.instance.getEditor("password_confirm")?.option("validationStatus", "valid")
            }
          } 
        },
        validationRules: [DxUtils.requiredRule(), DxUtils.passwordLengthRule()],
      },
    ]
  }

  initFormData(): void {
    if (this.userData) {
      this.formData = this.userData
      this.editing = true
    }
    else {
      this.formData = {}
      this.editing = false
    }
  }

  add = (e: any) => {
    if (this.form.instance.validate().isValid) {
      delete this.formData['password_confirm']
      this.onCloseEvent.emit({editing: this.editing, formData: this.formData});
      this.initFormItems();
    }
  }

  dismiss = (e: any) => {
    this.onCloseEvent.emit(null);
    this.initFormItems();
  }

  ngOnDestroy(): void {
    this.formData = {}
  }

}
