import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainLibraryBookDataService {
  private filePath = 'assets/mainLib.json';
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();
  private isDataFetched = false;
  constructor(private http: HttpClient) {}


  fetchData(): void {
    if (!this.isDataFetched) {
      this.http.get<any[]>(this.filePath).subscribe(
        (data) => {
          this.dataSubject.next(data);
          this.isDataFetched = true;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      this.dataSubject.next(this.dataSubject.value);
    }
  }
  
  removeEntry(index: number): void {
    const currentData = this.dataSubject.value;
    currentData.splice(index, 1);
    this.dataSubject.next(currentData);
  
}
addEntry(newEntry:any):void
{
  const currentData = this.dataSubject.value;
  currentData.push(newEntry);
  this.dataSubject.next(currentData);
}
printData(): void {
  const currentData = this.dataSubject.value;
  console.log('Current Data Array:', currentData);
}
getDataAtIndex(index: number): Observable<any | null> {
  return this.data$.pipe(map(data => (index >= 0 && index < data.length) ? data[index] : null));
}
}

