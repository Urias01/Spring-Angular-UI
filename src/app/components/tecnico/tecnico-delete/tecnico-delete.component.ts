import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(response => {
      response.perfis = [];
      this.tecnico = response;
    });
  }

  delete() {
    this.service.delete(this.tecnico.id).subscribe(
      () => {
        this.toast.success('Técnico deletado com Sucesso', 'Delete');
        this.router.navigate(['tecnicos']);
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
