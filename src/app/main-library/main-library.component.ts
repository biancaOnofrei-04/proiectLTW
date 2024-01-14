import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { saveAs } from 'file-saver';


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

  addData() {

  }

  removeData() {
    if (this.selectedRowIndex !== -1 || this.selectedRowIndex !== undefined) {
      // Remove the selected entry from dataToDisplay
      this.dataToDisplay.splice(this.selectedRowIndex, 1);
  
      // Update the table with the modified data
      this.dataSource.setData(this.dataToDisplay);
  
      // Convert the dataToDisplay to a JSON string
      const jsonString = JSON.stringify(this.dataToDisplay, null, 2);
  
      // Create a Blob containing the JSON data
      const blob = new Blob([jsonString], { type: 'application/json' });
  
      // Save the Blob as a file (mainLib.json)
      saveAs(blob, 'mainLib.json');
  
      // Reset the selectedRowIndex
      this.selectedRowIndex = -1;
    }
  }
  

  highlightRow(index:number):void
  {
    this.selectedRowIndex=index;
    console.log(index);
  }



  ngOnInit(): void {
    this.bookDataService.getData().subscribe(
      (data: any) => {
        this.dataToDisplay = data.map((item: any) => {
          return {
            bookTitle: item.bookTitle,
            author: item.author,
            numberOfPages: item.numberOfPages,
            genres: item.genres,
            review: item.review,
            description: item.description,
          };
        });

        this.dataSource.setData(this.dataToDisplay);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
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
