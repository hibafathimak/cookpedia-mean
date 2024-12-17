import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any=[]
  feedbacks:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getallReipes()
    this.getfeedback()
  }

  getallReipes(){
    this.api.getAllRecipes().subscribe((res:any)=>{
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);
    })
  }
  getfeedback(){
    this.api.getApprovedFeedbackApi().subscribe((res:any)=>{
      this.feedbacks = res
    })
  }
}
