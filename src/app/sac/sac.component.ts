import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SacSolicitacao } from '../model/sacSolicitacao';
import { first } from 'rxjs/operators';
import { SacService } from '../service/sac.service';
@Component({
  selector: 'app-sac',
  templateUrl: './sac.component.html',
  styleUrls: ['./sac.component.css']
})
export class SacComponent implements OnInit {
  sac: SacSolicitacao = new SacSolicitacao();
  msg:string;
  constructor(private serviceSAC:SacService, private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSave() : void{
    this.spinner.show();
    console.log('sac : ' , this.sac);

    this.serviceSAC.save(this.sac)
      .pipe(first())
      .subscribe(
        result => {
          //send msg succes
          this.msg= 'Serviço de atendimento registrado com sucesso.'
          this.toastr.success(this.msg, '');
          console.log(this.msg);
          this.spinner.hide();

        },
        error => {
          this.msg = 'Erro ao enviar Serviço de Atendimento.';
          this.toastr.error(this.msg, '');
          console.log(this.msg);
          this.spinner.hide();
        }
      ).closed

    this.sac = new SacSolicitacao();


    this.spinner.hide();
  }

}
