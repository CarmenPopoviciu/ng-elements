import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  open = false;

  toggle() {
    this.open = !this.open;
  }
}
