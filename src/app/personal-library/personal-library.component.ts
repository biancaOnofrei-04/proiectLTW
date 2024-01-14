import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject, map} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';


import { PersonalBooksServiceService } from '../services/personal-books-service.service';
import { PersonalBook } from '../services/personal-book-model';

@Component({
  selector: 'app-personal-library',
  standalone: true,
  imports: [MatButtonModule,MatTableModule,CommonModule],
  templateUrl: './personal-library.component.html',
  styleUrl: './personal-library.component.css'
})
export class PersonalLibraryComponent implements OnInit {

  constructor(private personalBookSerive: PersonalBooksServiceService)
  {
  }
  displayedColumns: string[] = ['bookTitle', 'author', 'numberOfPages', 'genres', 'review', 'description','dateAdded'];
  dataToDisplay: PersonalBook[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);

  ngOnInit(): void {
    this.dataToDisplay=this.personalBookSerive.getAllPersonalBooks();
    console.log(this.personalBookSerive.getAllPersonalBooks())
    this.dataSource.setData(this.dataToDisplay);
  }

}
class ExampleDataSource extends DataSource<PersonalBook> {
  private _dataStream = new ReplaySubject<PersonalBook[]>();

  constructor(initialData: PersonalBook[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PersonalBook[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PersonalBook[]) {
    this._dataStream.next(data);
  }
}