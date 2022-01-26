import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/iproduct';
import { IProductRepo } from '../interfaces/iproduct-repo';

@Injectable({
  providedIn: 'root'
})
export class ProductRepoService implements IProductRepo{
        
  baseUrl = "https://localhost:44335/api/Products/";

  constructor(private http:HttpClient) { }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl+"GetAllProductsOrderd");
  }
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl+"GetProductById/"+id);
    // return this.http.get<IProduct>("https://localhost:44335/api/blogs/GetBlogById?id="+id);
  }
  add(model: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl+"Create", model );
  }
  edit(model: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.baseUrl+"Update", model );
  }
  delete(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(this.baseUrl+"Delete/"+id);
    //return this.http.delete<IProduct>("https://localhost:44335/api/blogs/DeleteBlog?id="+id);
  }


  
}
