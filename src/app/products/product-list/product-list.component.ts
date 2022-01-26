import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductRepoService } from '../../services/repositories/product-repo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../../dialog/dialog.component';
import { IProduct } from '../../models/iproduct';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  title = 'AngularTask';
  displayedColumns: string[] = ['name', 'date', 'comment', 'price', 'color', 'categoryId', 'actions'];
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private productService: ProductRepoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }



  getAllProducts() {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => { this.toastr.error("Some thing Error", "Title") }
    })
  }


  deleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      complete: () => {
        this.toastr.info("Deleting Success !");
        this.getAllProducts();
      },
      error: () => { this.toastr.error("Some thing Error !") }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "35%"
    })
      .afterClosed().subscribe(() => this.getAllProducts());
  }

  editDialog(row: IProduct) {
    this.dialog.open(DialogComponent, {
      width: "35%",
      data: row
    })
      .afterClosed().subscribe(() => this.getAllProducts());
  }




}
