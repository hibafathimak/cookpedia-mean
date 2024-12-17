import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
profileImg:string="https://i.pinimg.com/564x/18/1c/57/181c572058c6dfef0998df3799128dd1.jpg"
userDownloadList:any=[]

constructor(private api:ApiService){}

ngOnInit(){
  this.getDownloadList()
  const user =JSON.parse(sessionStorage.getItem("user") || "")
  if(user.profilePic){
    this.profileImg=user.profilePic
  }
}

getDownloadList(){
  this.api.getUserDownloadListApi().subscribe((res:any)=>{
    this.userDownloadList=res    
  })
}

updateProfile(){
  this.api.editUserApi({profilePic:this.profileImg}).subscribe((res:any)=>{
    sessionStorage.setItem("user",JSON.stringify(res))
    this.profileImg=res.profilePic
    alert("Profile Updated Successfully")
  })
}

getFile(event:any){
let uploadFile = event.target.files[0]
let fr =new FileReader()
fr.readAsDataURL(uploadFile)
fr.onload=(event:any)=>{
  console.log(event.target.result);
  this.profileImg=event.target.result
}
}
}
