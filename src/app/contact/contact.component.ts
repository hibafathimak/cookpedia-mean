import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

testimonyForm:FormGroup

constructor(private fb:FormBuilder,private api:ApiService){
  this.testimonyForm=this.fb.group({
    name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
    email:["",[Validators.email,Validators.required]],
    message:["",[Validators.required]]
  })
}

addTestimonial(){
if(this.testimonyForm.valid){
const name =this.testimonyForm.value.name
const email =this.testimonyForm.value.email
const message =this.testimonyForm.value.message
// alert(`${name},${email},${message}`)

this.api.addTestimony({name,email,message}).subscribe((res:any)=>{
  alert("Thank You For Your Feedback")
  this.testimonyForm.reset()
})
}else{
  alert("Invalid Form")
}
}

 }

