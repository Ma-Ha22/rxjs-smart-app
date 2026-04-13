import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { debounceTime, delay, distinctUntilChanged, finalize, map, Observable, retryWhen, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/IProduct.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, NgFor, AsyncPipe, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  search$ = new Subject<string>();
  loading:boolean = false;


  results$ = this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(()=> this.loading = true),
      switchMap(term => 
         this._ProductService.getAll().pipe(
          map(
            (res:IProduct[]) => {
             return  res.filter(p=> p.title.toLowerCase().includes(term.toLowerCase()))
            }
          ),
          retryWhen(err=> err.pipe((delay(1000)))),
          finalize(()=> this.loading = false)
         )
      ),
     shareReplay()
      )

  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    // this.search$.subscribe(console.log);

      
  
  }
}
