import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DevExpress from "devextreme";
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { dxToolbarItem } from 'devextreme/ui/toolbar';
import { IComment } from 'src/app/models/data-models';
import { UserService } from 'src/app/modules/account/services/user.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.scss']
})
export class TaskCommentsComponent implements OnInit {
  @Input() taskId!: string

  @ViewChild('dataGrid') dataGrid!: DxDataGridComponent
  columns: DevExpress.ui.dxDataGridColumn[] = []
  toolbarItems: dxToolbarItem[] = []
  dataSource: IComment[] = []

  constructor(
    private comment: CommentService,
    private user: UserService,
  ) { }

  ngOnInit(): void {
    this.loadComments()
    this.initTableParams()
  }

  initTableParams(): void {
    this.columns = [
      {
        dataField: "author",
        caption: "Author",
        width: "20%",
        allowEditing: false,
      },
      {
        dataField: "body",
        caption: "Comment",
      },
    ];

    this.toolbarItems = [
      {
        text: 'Comments',
        location: 'before'
      },
    ]
  }

  onToolbarPreparing(e: any): void {
   e.toolbarOptions.items.push(...this.toolbarItems)
  }

  loadComments(): void {
    this.comment.getCommentsByTask(this.taskId)
    .subscribe(
      (res) => {
        this.dataSource = res
      },
      (err: HttpErrorResponse) => {
        notify({ message: "Failed to load data", type: "error", width: "auto"});
      }
    )
  }

  saveComment(e: any): void {
    console.log(e)
    if (e.changes.length > 0) {
      switch(e.changes[0].type) {
        case "update": 
          this.updateComment(e.changes[0].key.id, e.changes[0].data.body)
          break;
        case "remove":
          this.removeComment(e.changes[0].key.id)
          break;
        case "insert":
          this.insertComment(e.changes[0].data.body)
          break;
      }
    }
  }

  updateComment(id: string, body: string): void {
    const payload = {
      comment_id: id,
      body
    }
    this.comment.updateComment(payload)
    .subscribe(
      (res) => {
        this.loadComments()
      },
      (err: HttpErrorResponse) => {
        notify({ message: "Failed while updating the comment", type: "error", width: "auto"});
      }
    )
  }

  removeComment(id: string): void {
    this.comment.removeComment(id)
    .subscribe(
      (res) => {
        this.loadComments()
      },
      (err: HttpErrorResponse) => {
        notify({ message: "Failed while deleting the comment", type: "error", width: "auto"});
      }
    )
  }

  insertComment(body: string): void {
    const payload = {
      body,
      author_id: this.user.getUserId(),
      task_id: this.taskId
    }
    this.comment.createComment(payload)
    .subscribe(
      (res) => {
        this.loadComments()
      },
      (err: HttpErrorResponse) => {
        notify({ message: "Failed while creating the comment", type: "error", width: "auto"});
      }
    )
  }

  addRow(): void {
    this.dataGrid.instance.addRow()
  }

  editorPreparing(e: any): void {
    if (!e.component.cellValue(e.row.rowIndex, "author")) {
      e.component.cellValue(e.row.rowIndex, "author", this.user.getUserFullName());
    }
  }


}
