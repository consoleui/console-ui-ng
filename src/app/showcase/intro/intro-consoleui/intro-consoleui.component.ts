import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-intro-consoleui',
  templateUrl: './intro-consoleui.component.html',
  styleUrls: ['./intro-consoleui.component.scss']
})
export class IntroConsoleuiComponent implements OnInit {

  slug: string;
  content: string;

  intros = {
    consoleui: require('!!raw-loader!./intro-consoleui.adoc'),
    'getting-started': require('!!raw-loader!./getting-started.adoc'),
    'changelog': require('!!raw-loader!./changelog.adoc'),
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      let slug = paramMap.get('slug');
      this.slug = slug || 'consoleui';
      this.content = this.intros[this.slug];

      if (!this.content) {
        this.router.navigateByUrl('/');
      }
    });

  }

}
