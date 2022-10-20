import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClienteService } from 'src/app/services/client.service';
@Component({
  selector: 'app-cliente-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(response => {
      response.perfis = [];
      this.cliente = response;
    });
  }

  delete() {
    this.service.delete(this.cliente.id).subscribe(
      () => {
        this.toast.success('Cliente deletado com Sucesso', 'Delete');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        if (ex.error.erros) {
          ex.error.erros.forEach((err) => {
            this.toast.error(err.message);
            console.log(err.message);
          });
        } else {
          console.log(ex.error.message);
          this.toast.error(ex.error.message);
        }
      }
    );
  }

}
