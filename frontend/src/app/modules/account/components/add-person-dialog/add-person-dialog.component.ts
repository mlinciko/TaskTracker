import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems, IUser } from 'src/app/models/data-models';
import { DxUtils } from 'src/dx.utils';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('form') form!: DxFormComponent
  formItems!: IDxFormItems
  formData: any = {}

  @Input() data!: IUser
  constructor(
    protected user: UserService,
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
        dataField: 'position',
        label: { text: 'Position', visible: false },
        editorOptions: {
          labelMode: 'floating',
          disabled: !this.user.isMediumUser(),
        },
      },
    ]

    this.formData = this.data
  }

  add = (e: any) => {
    if (this.form.instance.validate().isValid) {
      this.onCloseEvent.emit(this.formData);
      this.initFormItems();
    }
  }

  dismiss = (e: any) => {
    this.onCloseEvent.emit(null);
    this.initFormItems();
  }

}
