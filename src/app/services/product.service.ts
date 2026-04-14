import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAll():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`https://fakestoreapi.com/products`);
  }
  fakeAddToCartApi(id: number) {
  return new Observable(observer => {
    console.log('API called for:', id);

    setTimeout(() => {
      observer.next(true);
      observer.complete();
    }, 2000);
  });
}
}
