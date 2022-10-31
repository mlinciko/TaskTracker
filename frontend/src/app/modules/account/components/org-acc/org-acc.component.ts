import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Observable } from 'rxjs';
import { IDxFormItems, IOrganisation } from 'src/app/models/data-models';
import { OrganisationService } from 'src/app/modules/services/organisation.service';
import { Utils } from 'src/app/modules/utils';
import { DxUtils } from 'src/dx.utils';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-org-acc',
  templateUrl: './org-acc.component.html',
  styleUrls: ['./org-acc.component.scss']
})
export class OrgAccComponent implements OnInit {
  @ViewChild('form') form!: DxFormComponent
  formItems!: IDxFormItems
  formData: IOrganisation | any = {}
  formDisabled: boolean = true

  loadOrganisation$!: Observable<IOrganisation>

  constructor(
    protected user: UserService,
    protected organisation: OrganisationService,
  ) { }

  ngOnInit(): void {
    this.initFormItems()
  }

  initFormItems(){
    this.formItems = [
      {
        editorType: 'dxTextBox',
        dataField: 'name',
        label: { text: 'Name of Organisation', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'inn',
        label: { text: 'Unique Organisation Number', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
      },
      {
        editorType: 'dxTextBox',
        dataField: 'address',
        label: { text: 'Address', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [DxUtils.requiredRule()],
      },
      {
        editorType: 'dxTextArea',
        dataField: 'description',
        label: { text: 'Description', visible: false },
        editorOptions: {
          labelMode: 'floating',
          maxLength: 3000,
        },
      },
    ]
    this.initFormData()
  }

  initFormData(): void {
    const orgId = this.user.getOrganisationId()
    if (orgId) {
      this.organisation.getOrganisation(orgId).subscribe(
        (res) => {
          this.formData = res
        },
        (err: HttpErrorResponse) => {
          if (err.error.message === 'Access token has been expired')
            Utils.tokenExpiredHandler()
          else notify({ message: "Server error", type: "error", width: "auto"});
        }
      )
    }
    else {
      this.formData = {name: null, inn: null, address: null, description: null}
    }
  }

  edirData(): void {
    this.formDisabled = false
  }

  add = (e: any) => {
    if (this.form.instance.validate().isValid) {
      
      const orgId = this.user.getOrganisationId()
      if (orgId) {
        this.loadOrganisation$ = this.organisation.update({organisation_id: orgId, ...this.formData})
      }
      else this.loadOrganisation$ = this.organisation.create(this.formData)

      this.loadOrganisation$.subscribe(
        (res) => {
          this.formData = res
          this.formDisabled = true
        },
        (err: HttpErrorResponse) => {
          if (err.error.message === 'Access token has been expired')
            Utils.tokenExpiredHandler()
          else notify({ message: "Server error", type: "error", width: "auto"});
        }
      )
    }
  }

  dismiss = (e: any) => {
    this.formDisabled = true
  }

}
