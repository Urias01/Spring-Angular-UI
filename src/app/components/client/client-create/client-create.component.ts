import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClienteService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClienteCreateComponent implements OnInit {
  cliente: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    perfis: [],
    dataCriacao: '',
  };
  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create() {
    this.service.create(this.cliente).subscribe(
      () => {
        this.toast.success('Cliente cadastrado com Sucesso', 'Cadastro');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        if (ex.error.erros) {
          ex.error.erros.forEach((err) => {
            this.toast.error(err.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.name.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.password.valid
    );
  }
}
