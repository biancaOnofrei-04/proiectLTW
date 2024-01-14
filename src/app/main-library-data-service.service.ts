import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainLibraryBookDataService {
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get<any>('assets/mainLib.json');
  }
}
