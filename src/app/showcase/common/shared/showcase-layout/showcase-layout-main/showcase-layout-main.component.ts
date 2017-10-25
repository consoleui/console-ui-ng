import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-showcase-layout-main',
  templateUrl: './showcase-layout-main.component.html',
  styleUrls: ['./showcase-layout-main.component.scss']
})
export class ShowcaseLayoutMainComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      // see also
      if (event instanceof NavigationEnd) {
        document.body.scrollTop = 0;
        let contentDiv = document.getElementById('cui-layout-workbench');
        // console.log('contentDiv', contentDiv);
        if (contentDiv) {
          contentDiv.scrollTop = 0;
        }
      }
    });
  }

}
