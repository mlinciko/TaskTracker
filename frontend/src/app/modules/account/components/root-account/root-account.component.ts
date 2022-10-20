import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppDxTabItem } from 'src/app/models/data-models';
import * as _ from 'lodash'

@Component({
  selector: 'app-root-account',
  templateUrl: './root-account.component.html',
  styleUrls: ['./root-account.component.scss']
})
export class RootAccountComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  selectedItem: any = null

  setActiveTab(): void {
    this.selectedItem = _.find(this.items, (item) => {
      return this.router.url.includes(item.path)
    })
  }

  ngOnInit(): void {
    this.setActiveTab()

    this.router.events.subscribe(() => {
      this.setActiveTab()
    })
  }

  selectTab(e: any): void {
    this.router.navigate([`./${e.itemData.path}`], { relativeTo: this.route })
  }

  items: IAppDxTabItem[] = [
    {
      text: 'Personal account',
      template: 'tab-item',
      path: '',
    },
    {
      text: 'Organisation',
      template: 'tab-item',
      path: 'organisation',
    },
    {
      text: 'Employees',
      template: 'tab-item',
      path: 'employees',
    },
  ]

}
