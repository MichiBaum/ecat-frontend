import {Component, HostListener, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api/treenode";
import {MenuItem} from "primeng";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  displaySideBar = false;
  data: TreeNode[];
  items: MenuItem[];
  screenSize: number;

  constructor() { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSize = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.screenSize = window.innerWidth;
    this.data = [
      {
        "label": "Group 1",
        "children": [{
          "label": "Class 1",
          "children": [{"label": "Family 1"}, {"label": "Family 2"}]
        },
          {
            "label": "Class 2",
            "children": [{"label": "Family 1"}]
          }]
      },
      {
        "label": "Group 2",
        "children": [
          {
            "label": "Class 1",
            "children": [
              {'label': 'Family 1'},
              {'label': 'Family 2'},
              {'label': 'Family 3'}
            ]
          },
          {
            "label": "Class 2",
            "children": [
              {'label': 'Family 1'},
              {'label': 'Family 2'},
              {'label': 'Family 3'}
            ]
          },
          {
            "label": "Class 3",
            "children": [
              {'label': 'Family 1'},
              {'label': 'Family 2'},
              {'label': 'Family 3'}
            ]
          },
        ]
      },
      {
        "label": "Group 3",
        "children": [{
          "label": "Class 1",
          "children": [{"label": "Family 1"}, {"label": "Family 2"}]
        },
          {
            "label": "Class 2",
            "children": [{"label": "Family 1"}, {"label": "Family 2"}]
          }]
      }
    ];
    this.items = [
      {
        label : 'Group 1',
        items : [
          [
            {
              label : 'Class 1',
              items: [
                {
                  label : 'Family 1'
                }
              ]
            }
          ]

        ]
      },
      {
        label: 'Group 2',
        items: [
          [
            {
              label: 'Class 1',
              items: [
                {
                  label: 'Family 1'
                }
              ]
            }
          ]
        ]
      },
      {
        label: 'Group 3',
        items: [
          [
            {
              label: 'Class 1',
              items: [
                {
                  label: 'Family 1'
                }
              ]
            }
          ]
        ]
      }
    ]
  }

}
