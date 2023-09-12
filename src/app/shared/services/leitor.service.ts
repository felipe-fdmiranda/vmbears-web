import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeitorService {

  constructor(private http: HttpClient) {
  }

  lerXML(arquivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    return this.http.post(environment.apiUrl.concat('/leitor/lerXML'), formData);
  }
}
