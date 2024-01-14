import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainLibraryBookDataService {
  private apiUrl = 'assets/mainLib.json';
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get<any>('assets/mainLib.json');
  }

}
