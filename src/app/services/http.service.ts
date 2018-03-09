import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {

  public static Host = 'http://localhost:8000';
  private serverAddress = '/api/';
  private tempServer = 'https://dceddbe3-7674-431a-aa5c-d861233e2197.mock.pstmn.io/api/';
  constructor(private http: HttpClient) {
  }

  get(url): Observable<any> {
    return this.http.get(this.tempServer + url, {observe: 'response'}).map(data => data.body);
  }

  put(url, values): Observable<any> {
    return this.http.put(this.serverAddress + url, values, {observe: 'response'}).map(data => data.body);
  }

  post(url, values): Observable<any> {
    return this.http.post(this.serverAddress + url, values, {observe: 'response'}).map(data => data.body);
  }

  delete(url): Observable<any> {
    return this.http.delete(this.serverAddress + url, {observe: 'response'}).map(data => data.body);
  }

}
