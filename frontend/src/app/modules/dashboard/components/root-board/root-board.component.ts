import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Status } from 'src/app/models/data-models';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from 'src/app/modules/account/services/user.service';
import { OrganisationService } from 'src/app/modules/services/organisation.service';
import { Utils } from 'src/app/modules/utils';

@Component({
  selector: 'app-root-board',
  templateUrl: './root-board.component.html',
  styleUrls: ['./root-board.component.scss']
})
export class RootBoardComponent implements OnInit {
  statuses: Status[] = []
  organisationName: string = ""

  constructor(
    protected dashboard: DashboardService,
    protected user: UserService,
    protected organisation: OrganisationService,
  ) { }

  ngOnInit(): void {
    this.getAllStatuses()
    if (this.user.isMediumUser())
      this.getOrganisationName()
  }

  getAllStatuses(): void {
    this.dashboard.getAllStatuses()
    .subscribe(
      (statuses) => {
        this.statuses = statuses
      },
      (err: HttpErrorResponse) => {
        notify({ message: "Failed to load data", type: "error", width: "auto"});
      }
    )
  }

  getOrganisationName(): void {
    const orgId = this.user.getOrganisationId()
    if (orgId) {
      this.organisation.getOrganisation(orgId)
      .subscribe(
        (organisation) => {
          this.organisationName = organisation.name
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401)
            Utils.tokenExpiredHandler()
          else notify({ message: "Failed to load data", type: "error", width: "auto"});
        }
      )
    }
  }

}
