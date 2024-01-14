import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject, map} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { MainLibraryBookDataService } from '../services/main-library-data-service.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PersonalBooksServiceService } from '../services/personal-books-service.service';

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
  constructor(private bookDataService: MainLibraryBookDataService, 
              private dialog: MatDialog,
              private personalBookService: PersonalBooksServiceService) {}
 
  displayedColumns: string[] = ['bookTitle', 'author', 'numberOfPages', 'genres', 'review', 'description'];
  dataToDisplay: Book[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);
  selectedRowIndex: number = -1;

  ngOnInit(): void {
    this.bookDataService.fetchData();
    this.bookDataService.data$.subscribe((data) => {
      this.dataSource.setData(data);
    });
  
    
  }
  
  removeData(): void {
    this.getBookTitle().subscribe((bookTitle: string | null) => {
      if (this.selectedRowIndex !== -1 && bookTitle !== null) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
          data: { bookTitle: bookTitle },
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.bookDataService.removeEntry(this.selectedRowIndex);
            this.selectedRowIndex = -1;
          }
        });
      }
    });
  }
  
  getBookTitle(): Observable<string | null> {
    return this.bookDataService.getDataAtIndex(this.selectedRowIndex).pipe(
      map((book: Book | null) => (book !== null ? book.bookTitle : null))
    );
  }
  addData(): void {
    this.bookDataService.getDataAtIndex(this.selectedRowIndex).subscribe((book: Book | null) => {
      if (book !== null) {
        const personalBook = {
          ...book,
          dateAdded: new Date(),
        };
        this.personalBookService.addPersonalBook(personalBook);
      }
    });
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
