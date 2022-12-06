import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  isMenuOpen = true;
  contentMargin = 240;
  constructor() { }

  ngOnInit(): void {
  }
  
  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 60;
     
    } else {
      this.contentMargin = 240;
     
    }
  }

}
