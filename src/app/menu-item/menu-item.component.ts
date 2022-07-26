import { Component, Input, OnInit } from '@angular/core';
import { GetMenuService } from '../get-menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input() public item: any;

  constructor() {}

  ngOnInit(): void {}
}
