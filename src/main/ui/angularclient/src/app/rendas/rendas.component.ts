import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendasService } from '../service/rendas-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Rendas } from '../model/rendas';

@Component({
  selector: 'app-rendas',
  templateUrl: './rendas.component.html',
  styleUrls: ['./rendas.component.css']
})
export class RendasComponent implements OnInit {
  id:string;  
  destroy$: Subject<boolean> = new Subject<boolean>();
  rendas: Rendas[];
  rendasDelete: Rendas;
  rendasCount = 0;

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private rendasService: RendasService) {
        this.rendasDelete = new Rendas();
      }
  ngOnInit(): void {
    this.getTodasRendas();
  }

  getTodasRendas(): void {
    this.rendasService.findAll().pipe(takeUntil(this.destroy$)).subscribe((rendas: Rendas[]) => {
        this.rendasCount = rendas.length;
        this.rendas = rendas;
        var rendaArray :Rendas[] = [];
        for (var i=0; i<this.rendasCount;i++){
            var renda: Rendas = new Rendas();
            if (this.rendas[i].tipo == "1"){
                renda.tipo = "Salário";
            }
            if (this.rendas[i].tipo == "2"){
                renda.tipo = "Empresa";
            }
            if (this.rendas[i].tipo == "3"){
                renda.tipo = "Aluguel";
            }
            if (this.rendas[i].tipo == "4"){
                renda.tipo = "Ações";
            }
            if (this.rendas[i].tipo == "5"){
                renda.tipo = "Juros Poupança";
            }
            if (this.rendas[i].tipo == "6"){
                renda.tipo = "Tesouro Direto";
            }
      
            renda.id = this.rendas[i].id;
            renda.nome = this.rendas[i].nome;
            renda.valor = this.rendas[i].valor;
            renda.usuario = this.rendas[i].usuario;
            rendaArray[i] = renda;
        }

        for (var i=0; i<this.rendasCount;i++){
            this.rendas.pop();
        }
        for (var i=0; i<this.rendasCount;i++){
            this.rendas.push(rendaArray[i]);
        }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  excluir(id: string){
    this.rendasService.delete(id).subscribe(data => {
        this.rendas = data;
        if (this.rendas != null){
            this.router.navigate(['/contas']);
        }
        else{
            alert("Não foi possível excluir");
        }
        });
}

}
