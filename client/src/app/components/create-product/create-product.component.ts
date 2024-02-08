import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  productForm!: FormGroup;
  constructor(private fb:FormBuilder, private router:Router,
    private toastr: ToastrService){
    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  addProduct(){
    console.info( this.productForm );

    const product:Product = {
      name:this.productForm.get('producto')?.value,
      category:this.productForm.get('category')?.value,
      location:this.productForm.get('location')?.value,
      price:this.productForm.get('price')?.value
    }

    this.toastr.success('Hello world!', 'Toastr fun!');

    this.router.navigate(['/']);
  }
}