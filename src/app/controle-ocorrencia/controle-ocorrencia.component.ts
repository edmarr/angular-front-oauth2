import { Component, OnDestroy } from '@angular/core';

import { OcorrenciaService } from '../service/ocorrencia.service';
import { ListaItem } from '../model/listaItem';
import { ProdutoEntrega } from '../model/produtoEntrega';
import { Ocorrencia } from '../model/ocorrencia';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CargaService } from '../service/carga.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-controle-ocorrencia',
  templateUrl: './controle-ocorrencia.component.html',
  styleUrls: ['./controle-ocorrencia.component.css']
})
export class ControleOcorrenciaComponent implements OnDestroy {
  dataSource;
  displayedColumns = ['customAction', 'id', 'descricao'];
  listaTipo$: Observable<ListaItem[]>;
  ocorrencia: Ocorrencia = new Ocorrencia();
  produtoEntregaSelecionado:ProdutoEntrega;
  private msg;
  private navigationSubscription;




  constructor(private serviceOcorrencia: OcorrenciaService, serviceCarga: CargaService, private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initialiseInvites(): void {
    this.spinner.show();
    this.dataSource = new ListaItemDataSource(this.serviceOcorrencia);
    this.listaTipo$ = this.serviceOcorrencia.getListaiTipo();
    console.log('lista', this.listaTipo$);
    this.spinner.hide();
  }

  adicionaItemBenProduto(produto: ProdutoEntrega): void {
    this.produtoEntregaSelecionado = produto;
  }

  adicionaItemTipoOcorrencia(item: number): void {
    this.ocorrencia.idTipoOcorrencia = item;
  }

  onSave(): void {
    console.log('alerta on save:', this.ocorrencia);
    console.log('alerta Produto Selecionado:', this.produtoEntregaSelecionado);
    this.spinner.show();
    this.ocorrencia.idItemBemProduto = this.produtoEntregaSelecionado.id;
    this.ocorrencia.email = this.produtoEntregaSelecionado.email;
    this.ocorrencia.emailDestinatario = this.produtoEntregaSelecionado.emailDestinatario;
    this.ocorrencia.descricaoItemBemProduto = this.produtoEntregaSelecionado.descricao;
    this.serviceOcorrencia.save(this.ocorrencia)
      .pipe(first())
      .subscribe(
        result => {
          //send msg succes
          this.msg= 'Ocorrência registrada com sucesso.'
          this.toastr.success(this.msg, '');
          console.log(this.msg);
          this.spinner.hide();

        },
        error => {
          this.msg = 'Erro ao salvar ocorrência';
          this.toastr.error(this.msg, '');
          console.log(this.msg);
          this.spinner.hide();
        }
      ).closed

    this.ocorrencia = new Ocorrencia();
  }

  onCancel(): void {
    this.ocorrencia = new Ocorrencia();
  }

}
export class ListaItemDataSource extends DataSource<any> {
  constructor(private service: OcorrenciaService) {
    super();
  }
  connect(): Observable<ListaItem[]> {
    return this.service.getListaitensEntrega();
  }
  disconnect() { }
}

export class SelectHintErrorExample {
  animalControl = new FormControl('', [Validators.required]);
}

