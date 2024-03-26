import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresarial',
  templateUrl: './empresarial.component.html',
  styleUrls: ['./empresarial.component.css']
})
export class EmpresarialComponent implements OnInit {

  labelSucursales:boolean=false;
  onLlamada:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  llamada(){

    window.scroll({
      top: 450,
      left: 0,
      behavior: 'smooth',
    });

    if (this.labelSucursales == false){
      this.labelSucursales = true;
      this.onLlamada = true;

      const labSuc = document.getElementById('row-sucursales');

      if (labSuc != null) {
        labSuc.classList.add('div-row-sucursales-active');
      }

      const call = document.getElementById('All');

      if (call != null) {
        call.classList.add('AllBackActive');
      }

    } else {
      this.labelSucursales = false;
      this.onLlamada = false;
    }

  }

  close(){

    this.labelSucursales = false;
    this.onLlamada = false;

    const labSuc = document.getElementById('row-sucursales');

    if (labSuc != null) {
      labSuc.classList.remove('div-row-sucursales-active');
    }

    const call = document.getElementById('All');

    if (call != null) {
      call.classList.remove('AllBackActive');
    }

  }

}
