import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard implements CanActivate {

  constructor(private router: Router){}
  
  canActivate(){
    if(!localStorage.getItem('userLogged')){
    this.router.navigate([''], { replaceUrl: true });
    return false;
    }
    else if(localStorage.getItem('userLogged') && !localStorage.getItem('userSettings')){
      this.router.navigate(['config'], { replaceUrl: true });
      return false;
    }
    else{
      return true;
    }
    
  }
  
}
