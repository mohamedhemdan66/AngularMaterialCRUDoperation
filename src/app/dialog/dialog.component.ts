import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/models/iproduct';
import { ProductRepoService } from 'src/app/services/repositories/product-repo.service';

interface Category {
  id: number;
  name: string;
}
interface Color {
  id: number;
  name: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  actionBtnVal:string = "Create";
  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductRepoService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:IProduct,
    private toastr: ToastrService
    ) { }
  
  ngOnInit(): void {
    if(this.editData){
      this.actionBtnVal = "Update";
      this.productForm.setValue(this.editData);
    }
  }
  
  categories: Category[] = [{id: 1, name: 'Category 1'},{id: 2, name: 'Category 2'},{id: 3, name: 'Category 3'}];
  colors: Color[] = [{id: 0, name: 'Red'},{id: 1, name: 'Blue'},{id: 2, name: 'Green'}];


 // productData!:IProduct;
  productForm = this.formBuilder.group({
    id:0,
    name:['',Validators.required],
    categoryId:[1,Validators.required],
    date:['',Validators.required],
    color:[0,Validators.required],
    price:['',Validators.required],
    comment:['',Validators.required],
  })

  onSave(){
    if(!this.editData){
      this.addProduct();
    }else{
      this.editProduct();
    }
  }

  addProduct(){
     if(this.productForm.valid){
      this.productService.add(this.productForm.value).subscribe({
        complete:()=>{
           this.toastr.success("Successfully added product !",'Title');
            this.productForm.reset();
            this.dialogRef.close('create');
          },
        error:()=>{ this.toastr.error("Some thing Error !");}
      });
     };
  }


  editProduct(){
    this.productService.edit(this.productForm.value).subscribe({
      complete:()=>{
         this.toastr.success("Successfully added product !",'Title');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
      error:()=>{ this.toastr.error("Some thing Error !");}
    });
  }

  
}
