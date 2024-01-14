import { Injectable } from '@angular/core';
import { PersonalBook } from './personal-book-model';

@Injectable({
  providedIn: 'root'
})
export class PersonalBooksServiceService {

  public personalBooks: PersonalBook[] = [];
  constructor() { }

  addPersonalBook(newBook:PersonalBook):void
  {
    this.personalBooks.push(newBook);
  }
  getAllPersonalBooks():PersonalBook[]
{
  return this.personalBooks;
}
}
