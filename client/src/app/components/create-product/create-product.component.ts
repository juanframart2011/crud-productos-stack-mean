import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  id:string | null;

  productForm!: FormGroup;
  constructor(private fb:FormBuilder, private router:Router,
    private productService:ProductService,
    private aRouter:ActivatedRoute,
    private toastr: ToastrService){
    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit():void{
    this.edit();
  }

  addProduct(){
    console.info( this.productForm );

    const product:Product = {
      name:this.productForm.get('producto')?.value,
      category:this.productForm.get('category')?.value,
      location:this.productForm.get('location')?.value,
      price:this.productForm.get('price')?.value
    }

    if( this.id !== null){

      this.productService.update(this.id,product).subscribe(data=>{

        this.toastr.success('Hello world!', 'Toastr fun!');
        this.router.navigate(['/']);
      }, error =>{
  
        console.warn(error);
        this.productForm.reset();
      });
    }
    else{

      this.productService.save(product).subscribe(data=>{

        this.toastr.success('Hello world!', 'Toastr fun!');
        this.router.navigate(['/']);
      }, error =>{
  
        console.warn(error);
        this.productForm.reset();
      });
    }
  }

  edit(){
    if(this.id !== null){
      this.productService.detail(this.id).subscribe(data=>{
        this.productForm.setValue({
          producto: data.name,
          category: data.category,
          location: data.location,
          price: data.price
        });
      });
    }
  }
}