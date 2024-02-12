import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit{

  products:Product[] = [];

  constructor( private productService:ProductService, private toastr: ToastrService){}

  ngOnInit():void{
    this.getProducts();
  }

  delete(id:any){
    console.info( "delete => ", id );
    this.productService.delete(id).subscribe(data=>{

      this.toastr.error('producto eliminado con éxito', "producto eliminado");
      this.getProducts();
    },error=>{
      console.warn(error);
    });
  }

  getProducts(){
    this.productService.getProduct().subscribe(data=>{

      this.products = data;
    },error=>{
      console.warn(error);
    });
  }
}