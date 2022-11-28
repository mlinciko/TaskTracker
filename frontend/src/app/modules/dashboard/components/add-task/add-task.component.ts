import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';
import { IDxFormItems, Status, Task } from 'src/app/models/data-models';
import { UserService } from 'src/app/modules/account/services/user.service';
import { Utils } from 'src/app/modules/utils';
import { DxUtils } from 'src/dx.utils';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('form') form!: DxFormComponent
  formItems!: IDxFormItems
  formData: any = {}

  statuses: Status[] = []
  executors: {user_id: string, name: string}[] = []

  constructor(
    protected dashboard: DashboardService,
    protected user: UserService,
  ) { }

  ngOnInit(): void {
    this.getStatuses()
  }

  getStatuses(): void {
    const orgId = this.user.getOrganisationId()
    if (orgId) {
      forkJoin(
        this.dashboard.getAllStatuses(),
        this.user.getExecutors(orgId),
      )
      .subscribe(
        ([statuses, executors]) => {
          this.statuses = statuses
          this.executors = executors
          this.initFormItems()
        }
      ) 
    }
  }

  initFormItems(): void {
    this.formItems = [
      {
        itemType: 'group',
        colCount: 3,
        items: [
          {
            colSpan: 2,
            editorType: 'dxTextBox',
            dataField: 'name',
            label: { text: 'Name', visible: false },
            editorOptions: {
              labelMode: 'floating'
            },
            validationRules: [DxUtils.requiredRule()],
          },
        ]
      },
      {
        itemType: 'group',
        colCount: 3,
        items: [
          {
            colSpan: 1,
            editorType: 'dxSelectBox',
            dataField: 'status_id',
            label: { text: 'Status', visible: false },
            editorOptions: {
              labelMode: 'floating',
              dataSource: this.statuses,
              valueExpr: "id",
              displayExpr: "name",
            },
          },
          {
            colSpan: 1,
            editorType: 'dxDateBox',
            dataField: 'deadline',
            label: { text: 'Deadline', visible: false },
            editorOptions: {
              labelMode: 'floating',
              displayFormat: "dd.MM.yyyy",
              dateSerializationFormat: "yyyy.MM.dd",
              useMaskBehavior: true,
              showClearButton: true,
            },
            validationRules: [DxUtils.requiredRule()],
          }
        ]
      },
      {
        itemType: 'group',
        colCount: 3,
        items: [
          {
            colSpan: 2,
            editorType: 'dxTextBox',
            dataField: 'theme',
            label: { text: 'Theme', visible: false },
            editorOptions: {
              labelMode: 'floating'
            },
            validationRules: [DxUtils.requiredRule()],
          },
        ]
      },
      {
        itemType: 'group',
        colCount: 3,
        items: [
          {
            colSpan: 1,
            editorType: 'dxSelectBox',
            dataField: 'executor_id',
            label: { text: 'Executor', visible: false },
            editorOptions: {
              labelMode: 'floating',
              dataSource: this.executors,
              valueExpr: "user_id",
              displayExpr: "name",
            },
            validationRules: [DxUtils.requiredRule()],
          },
        ]
      },
      {
        itemType: 'group',
        colCount: 3,
        items: [
          {
            colSpan: 3,
            editorType: 'dxTextArea',
            dataField: 'description',
            label: { text: 'Description', visible: false },
            editorOptions: {
              labelMode: 'floating',
              maxLength: 5000,
            },
            validationRules: [DxUtils.requiredRule()],
          },
        ]
      }
    ]
  }

  saveTask = (e: any) => {
    console.log(this.formData)
    if (this.form.instance.validate().isValid) {
      const dashId = this.user.getDashboardId()
      const creatorId = this.user.getUserId()
      if (dashId && creatorId) {
        let params = Utils.createTaskParams(this.formData, creatorId, dashId)
        this.dashboard.createTask(params)
        .subscribe(
          (res: Task) => {
            this.reset()
          },
          (err: HttpErrorResponse) => {
            notify({ message: err.error.message ? err.error.message : "Failed to load data", type: "error", width: "auto"});
          }
        )
      }
    }
  }

  cancel = (e: any) => {
    this.reset()
  }

  reset(): void {
    this.form.instance.resetValues()
  }

}
