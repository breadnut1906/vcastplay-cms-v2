import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  set(key: any, value: any, remember: boolean = false) {
    remember ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
  }

  get(key: any): any {    
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  }

  remove(key: any) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
