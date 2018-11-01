import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';


import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';







@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.css']
})

@Injectable()
/* @Component({templateUrl: 'gui.component.html'}) */
export class GuiComponent implements OnInit {
  
  results:any[];
  current_stat:any; 
  selValue:any;
  selOption:any;
  selUpdate:any;
  _router: Router;
  message:any[];
  errorMessage:any;
  searchMessage:any;

  update_data(current_status: String,to_status: String,dnis:String){ 
    this.errorMessage = '';
  console.log('http://webservices-stage.advantone.com/sw-angular/gui.php?updateto='+to_status+'&dnis='+dnis);
    //this.selValue = args.target.value; 
   // this.selOption = args.target.options[args.target.selectedIndex].text; 
    console.log('updating stat FROM: '+current_status+ ' TO '+to_status);
       if(current_status != 'Reserved' &&  to_status == 'Reserved')
       this.errorMessage = 'Cannot update status to Reserved - current status is: '+current_status;
      
       //else if(to_status != 'Reserved' &&  current_status == 'Reserved')
       else if(current_status == 'Reserved')
       {
       this.errorMessage = 'Cannot update status to '+to_status+' - current status is Reserved';
    
       }
      else
      {
        this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php?updateto='+to_status+'&dnis='+dnis).subscribe( data => { this.results = data.json();}
        this.results = Array.of(this.results);

      }


  }
  updatStatus(args){ 
    this.selValue = args.target.value; 
  this.selOption = args.target.options[args.target.selectedIndex].text; 
  this.selUpdate = args.target.value; 
  
 this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php?updateto='+this.selOption+'&dnis='+this.selValue).subscribe( data => { this.results = data.json();}
 this.results = Array.of(this.results); 

  //this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php?updateto='+this.selOption+'&dnis='+this.selValue).subscribe( data => { this.message = data;}
  //this.message= Array.of(this.message); 
 //console.log(this.message);


 
  
  } 

  selectchange(args){ 
    this.selValue = args.target.value; 
    this.selOption = args.target.options[args.target.selectedIndex].text; 
  
  } 
  change_status_filter(current_stat)
  {

    this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php?status='+current_stat).subscribe( data => { this.results = data.json();}
    this.results = Array.of(this.results); 
     

  } 

  search_filter(name,value)
  {

    //if (name == 'sdnis')name = 'DNIS';
    this.searchMessage = "";
    if (!value)  this.searchMessage = 'Please enter a value';
    else
    {
    this.searchMessage = 'Search results for `' +name+ '` and value is `'+value+'`';
   // console.log('SEARCHING FOR' +name+ 'with value of '+value);
   // console.log('http://webservices-stage.advantone.com/sw-angular/gui.php?'+name+'='+value);
     this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php?'+name+'='+value).subscribe( data => { this.results = data.json();}
  
    this.results = Array.of(this.results);  
   
    }
  
  } 
  currentUser: User;
  users: User[] = [];
    constructor(private http:Http, private userService: UserService) 
      {   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     

     }


  ngOnInit() { 
    this.loadAllUsers();
    //this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php?status=ready').subscribe(data => {console.log(this.results=data);});
    this.http.get('http://webservices-stage.advantone.com/sw-angular/gui.php').subscribe( data => { this.results = data.json();}
 this.results = Array.of(this.results); 
 //console.log(this.results=data);




}


  }
 
}

