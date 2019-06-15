import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ns-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  moduleId: module.id,
})
export class HeaderComponent implements OnInit {
  @Output() onOpenMenu: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.onOpenMenu.emit(true);
  }

}
