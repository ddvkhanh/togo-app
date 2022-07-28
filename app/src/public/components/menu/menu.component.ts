import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() placeDescriptions = [];

  @Output() newSearchEvent = new EventEmitter<string>();

  isCollapsed: boolean = false;
  searchText = '';

  constructor() { }

  ngOnInit(): void {
  }

  onMenuSearch(value: string){
    this.newSearchEvent.emit(value)
  }

}
