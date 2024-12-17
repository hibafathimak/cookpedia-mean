import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selected = new Date()
  isSideBarOpen: boolean = false
  columnWidth: string = "col-lg-12 p-0"
  userCount: Number = 0
  recipeCount: Number = 0
  downloadCount: Number = 0
  requestCount: Number = 0
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title:{
    text:"Analysis of Download Recipes based on Cusine",
    align:'left'
    },
    xAxis:{
      type:'category'
    },
    yAxis:{
      title:{
        text:"Total Download Recipe Count"
      }
    },
    legend:{
      enabled:false
    },
    credits:{
      enabled:false
    },
   
    series: [{
      name: "Cuisine",
      colorByPoint: true, 
      type: 'bar',
      data: [
          { name: "Italian", y: 2, color: "#6A1B9A" },   
          { name: "Asian", y: 4, color: '#9FA6B2' },     
          { name: "American", y: 1, color: '#332D2D' }  , 
          { name: "Korean", y: 3, color: '#6A1B9A' },   


      ]
  }]
  
    
      
  }

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(){
    this.getUserCount()
    this.getDownloadCount()
    this.getRecipeCount()
    this.getRequestCount()
  }

  getUserCount(){
    this.api.getAllUsersApi().subscribe((res:any)=>{
      this.userCount=res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipes().subscribe((res:any)=>{
      this.recipeCount=res.length
    })
  }
  getDownloadCount(){
    this.api.getAllDownloadsApi().subscribe((res:any)=>{
      this.downloadCount=res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
    })
  }
  getRequestCount(){
    this.api.getAllTestimonyApi().subscribe((res:any)=>{
      this.requestCount=res.filter((item:any)=>item.status=="Pending").length
    })
  }

  menuBtnClick() {
    this.isSideBarOpen = !this.isSideBarOpen
    this.columnWidth = "col p-0"
  }

  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }

}
