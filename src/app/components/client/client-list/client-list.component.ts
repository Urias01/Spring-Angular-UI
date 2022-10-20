import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ClienteService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  ELEMENT_DATA: Client[] = [];

  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClienteService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
