import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


import { MainLibraryBookDataService } from '../main-library-data-service.service';

export interface Book {
  bookTitle: string;
  author: string;
  numberOfPages: number;
  genres: string[];
  review: number;
  description: string;
}

@Component({
  selector: 'app-main-library',
  standalone: true,
  imports: [MatButtonModule, MatTableModule,CommonModule],
  templateUrl: './main-library.component.html',
  styleUrl: './main-library.component.css',

})
export class MainLibraryComponent implements OnInit {
  constructor(private bookDataService: MainLibraryBookDataService) {}
 
  displayedColumns: string[] = ['bookTitle', 'author', 'numberOfPages', 'genres', 'review', 'description'];
  dataToDisplay: Book[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);
  selectedRowIndex: number = -1;

  ngOnInit(): void {
    console.log("Hello :)")
    this.bookDataService.fetchData();
    this.bookDataService.data$.subscribe((data) => {
      this.dataSource.setData(data);
    });
  
    
  }
  
  removeData() {
    if (this.selectedRowIndex !== -1) {
      this.bookDataService.removeEntry(this.selectedRowIndex);
      this.selectedRowIndex = -1;
    }
  }
  addData() {

  }


  highlightRow(index:number):void
  {
    this.selectedRowIndex=index;
    console.log(index);
  }




}

class ExampleDataSource extends DataSource<Book> {
  private _dataStream = new ReplaySubject<Book[]>();

  constructor(initialData: Book[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Book[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Book[]) {
    this._dataStream.next(data);
  }
}
