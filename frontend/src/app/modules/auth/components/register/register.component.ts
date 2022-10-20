import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { IDxFormItems } from 'src/app/models/data-models';
import { DxUtils } from 'src/dx.utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('form') form!: DxFormComponent
  formItems!: IDxFormItems
  formData: any = {}

  constructor(
    protected auth: AuthService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.initFormItems()
  }

  initFormItems(){
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
          labelMode: 'floating'
        },
        validationRules:[
          {
            type: "custom",
            reevaluate: false,
            message: "Invalid telephone number",
            validationCallback: (e: any): boolean => {
              const tel = e.value;
              if (tel.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/))
                return true;
              else return false
            },
          },
        ]
      },
      {
        editorType: 'dxTextBox',
        dataField: 'password',
        label: { text: 'Password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password',  
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

  submitForm(): void {
    if (this.form.instance.validate().isValid) {
      this.auth.register(this.formData).subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate(['../dashboard'])
          }
        },
        (err: HttpErrorResponse) => {
          notify({ message: err, type: "error", width: "auto"});
        }
      )
    }
      
  }

}
