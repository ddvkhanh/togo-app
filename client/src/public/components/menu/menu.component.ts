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

  onSearchButtonClick(){
    this.newSearchEvent.emit(this.searchText)
  }

  onSuggestionClick(keyword: string){
    (<HTMLInputElement>document.getElementById('search-input')).value = keyword;
    this.searchText=keyword;
    this.newSearchEvent.emit(this.searchText)
  }

  onClearInput(){
    if ((<HTMLInputElement>document.getElementById('search-input')).value.length==0){
      this.newSearchEvent.emit(null);
    }
  }

}
