import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Rendas } from '../model/rendas';
import { RendasService } from '../service/rendas-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inserir-rendas-modal',
  templateUrl: './inserir-rendas-modal.component.html',
  styleUrls: ['./inserir-rendas-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class InserirRendasModalComponent implements OnInit {

  model: NgbDateStruct;

  rendas: Rendas;
  rendasArray: any[] = [];
  rendasasCount = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
      private rendasService: RendasService,
      private location: Location,
      config: NgbInputDatepickerConfig, 
      calendar: NgbCalendar) {
    this.rendas = new Rendas();

        		// customize default values of datepickers used by this component tree
		config.minDate = { day: 1, month: 1, year: 1900 };
		config.maxDate = {day: 31, month: 12, year: 2099 };

		// days that don't belong to current month are not visible
		config.outsideDays = 'hidden';

		// weekends are disabled
		config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;

		// setting datepicker popup to close only on click outside
		config.autoClose = 'outside';

		// setting datepicker popup to open above the input
		config.placement = ['right', 'right'];
}

onSubmit() {
  if (this.rendas.tipo == "Salário"){
    this.rendas.tipo = "1";
  }
  if (this.rendas.tipo == "Empresa"){
    this.rendas.tipo = "2";
  }
  if (this.rendas.tipo == "Aluguel"){
    this.rendas.tipo = "3";
  }
  if (this.rendas.tipo == "Ações"){
    this.rendas.tipo = "4";
  }
  if (this.rendas.tipo == "Juros Poupança"){
    this.rendas.tipo = "5";
  }
  if (this.rendas.tipo == "Tesouro Direto"){
    this.rendas.tipo = "6";
  }
  if (this.rendas.tipo == "Outros"){
    this.rendas.tipo = "7";
  }
  this.rendas.usuario = this.idUsuario;
  this.rendas.data = this.model.day + '-' + this.model.month + '-' + this.model.year;
  this.rendasService.save(this.rendas).subscribe(data => {
    this.rendas = data;
    if (this.rendas != null){
        this.gotoRendasList();
    }
    });
}

  gotoRendasList() {
    this.closePopup();
    alert('Salvo com sucesso!');
    location.reload();
  }
    displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  ngOnInit(): void {
  }

  @Input() idUsuario : string;

}
