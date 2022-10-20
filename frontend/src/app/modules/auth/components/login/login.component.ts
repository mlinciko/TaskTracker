import { Component, OnInit, ViewChild } from '@angular/core';
import { DxUtils } from 'src/dx.utils';
import { IDxFormItems } from 'src/app/models/data-models';
import { DxFormComponent } from 'devextreme-angular';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import notify from "devextreme/ui/notify";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
        dataField: 'email',
        label: { text: 'Email', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [DxUtils.requiredRule()],
      }, 
      {
        editorType: 'dxTextBox',
        dataField: 'password',
        label: { text: 'Password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password',  
        },
        validationRules: [DxUtils.requiredRule()],
      }
    ]
  }

  submitForm(): void {
    if (this.form.instance.validate().isValid){
      this.auth.login(this.formData).subscribe(
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
