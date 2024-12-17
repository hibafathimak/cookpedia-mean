import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {
  allRequests:any=[]

  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllTestimony()
  }

  getAllTestimony(){
    this.api.getAllTestimonyApi().subscribe((res:any)=>{
      this.allRequests=res
    })
  }
  updateTesimony(id:string,status:string){
    this.api.updateFeedbackApi(id,status).subscribe((res:any)=>{
      this.getAllTestimony()
    })
  }
}
