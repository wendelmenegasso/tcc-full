import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastos-usuario',
  templateUrl: './gastos-usuario.component.html',
  styleUrls: ['./gastos-usuario.component.css']
})
export class GastosUsuarioComponent implements OnInit {

  id: string;
  query: string;
  chaveValor: string[];
  chave: string;
  valor: string;

  constructor() { }

  ngOnInit(): void {
    this.query = location.search.slice(1);
    this.chaveValor = this.query.split('=');
    this.chave = this.chaveValor[0];
    this.valor = this.chaveValor[1];
    this.id = this.valor;
  }
  @Input() idUsuario : string;
}
