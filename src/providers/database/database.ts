import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  db_url="http://crm.gr-group.co.in/server/index.php/app/";
  

  token_value:any;

  constructor(public http: HttpClient) {
  }

  login(data:any,fn:any)
  {
    let header = new HttpHeaders();  
    console.log(header);    
    return this.http.post(this.db_url+fn,JSON.stringify(data),{ headers: header })
  }
  
  getData(data:any,fn:any)
  {
    this.token_value = this.get_token_data();
    
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    header = header.append('Authorization','Bearer '+this.token_value);
    header = header.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(header);
    console.log("token" ,this.token_value);
    
    
    return this.http.post(this.db_url+fn,JSON.stringify(data),{ headers:header })
  }

  get_login(data:any,fn:any)
  {
    let header = new HttpHeaders();

    header = header.append('Authorization','Bearer '+data);
    header = header.append("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post(this.db_url+fn,JSON.stringify(data),{ headers:header })

  }
  
  private token_data : any;
  set_token_data(value)
  {
    this.token_data = value;
  }
  get_token_data()
  {
    return this.token_data;
  }
}
