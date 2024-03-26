import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mil-gracias-por-tu-tiempo',
  templateUrl: './mil-gracias-por-tu-tiempo.component.html',
  styleUrls: ['./mil-gracias-por-tu-tiempo.component.css']
})
export class MilGraciasPorTuTiempoComponent implements OnInit {

  constructor() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
   }

  ngOnInit(): void {
  }

}
