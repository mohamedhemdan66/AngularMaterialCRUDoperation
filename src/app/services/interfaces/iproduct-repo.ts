import { Observable } from "rxjs";
import { IProduct } from "src/app/models/iproduct";

export interface IProductRepo {
    getAll():Observable<IProduct[]>,
    getById(id: number):Observable<IProduct>,
    add(model:IProduct):Observable<IProduct>,  // or return void
    edit(model:IProduct):Observable<IProduct>, // or return void
    delete(id:number):Observable<IProduct>     // or return void
}
