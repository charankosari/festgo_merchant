import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
// import { isEmpty, get, has, merge, omit } from 'lodash';
import { Subject, throwError, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public httpClient: HttpClient,
    public messageService: MessageService
  ) { 
  }
  public isMobileView: boolean = false;
  public $breakpoint: Subject<boolean> = new Subject();

  encodeBase64(str: string): string {
    const utf8Bytes = new TextEncoder().encode(str);
    const base64String = btoa(String.fromCharCode(...utf8Bytes));
    return base64String;
  }

  decodeBase64(base64Str: string): string {
    const binaryString = atob(base64Str);
    const binaryBytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    return new TextDecoder().decode(binaryBytes);
  }

  getCommonHttpClientParams(urlAppendedString: any) {  
    return this.httpClient.get(urlAppendedString).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }
  
  getCommonFileDownload(urlAppendedString: any, params: any = {}){
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.httpClient.get(urlAppendedString,{responseType:"blob",params: httpParams}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getCommonHttpClientQueryParams(url: any, params: any) {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` }
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.httpClient.get(url, {params: httpParams}).pipe(
      map((res: any) => {        
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getCommonHttpTimeout(url: any, params: any, time: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.httpClient.get(url, {headers: new HttpHeaders({ timeout: `${time*1000}` }), params: httpParams}).pipe(
      // timeout(time*1000),
      map((res: any) => {        
        return res;
      }),
      catchError((error) => {
       return throwError(error);
      })
    );
  }

  getResponseDataForFilter(url: any, params: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.httpClient.get(url, {params: httpParams}).pipe(
      map((res: any) => {
        if(res.data && res.data.items){
          return res.data.items;
        }        
        return res.data;
      }),
      catchError(this.handleError)
    );
  }

  postCommonHttpClient(url: any, data: any,httpOptions={}) {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` }
    return this.httpClient.post(url, data, {headers}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  postCommonHttpClientWithProgress(url: any, data: any) {
    return this.httpClient.post(url, data,{
      reportProgress: true,
      observe: 'events'
    });
  }

  postCommonHttpClientWithParams(url: any, data: any, params: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.httpClient.post(url, data, {params: httpParams}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  putCommonHttpClient(url: any, data: any) {
    return this.httpClient.put(url, data).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  putCommonHttpClientWithParams(url: any, data: any, params: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.httpClient.put(url, data, { params: httpParams }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  deleteCommonHttpClient(url: any) {
    return this.httpClient.delete(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: any): Observable<never> {
    console.log(error);
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to save. Please try again.",
      life: 3000,
    });
    return throwError(error);
  }
}
