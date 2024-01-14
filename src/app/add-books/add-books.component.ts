import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MainLibraryBookDataService } from '../main-library-data-service.service';


@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
  MatInputModule,
MatSelectModule,
MatButtonToggleModule,
MatButtonModule,
MatIconModule,

],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css'
})
export class AddBooksComponent implements OnInit {
  bookForm!: FormGroup;
  genreList: string[] = ["Psychological fiction", "Philosophical novel", "Crime fiction",
  "Family saga", "Tragicomedy", "Novel", "Realism", "Tragedy",
  "Gothic fiction", "Romantic novel", "Epic poetry", "Mythology", "War story", "Adventure",
  "Mystery", "Science fiction", "Fantasy", "Historical fiction", "Thriller",
  "Horror", "Adventure", "Humor", "Dystopian", "Biography",
  "Self-help", "Romantic comedy", "Action and adventure", "Satire", "Western",
  "Young adult", "Children's literature", "Historical romance", "Contemporary", "Magic realism","Others"];
  genres: FormControl = new FormControl([]);

  constructor(private formBuilder: FormBuilder, private bookDataService: MainLibraryBookDataService) { }

  ngOnInit(): void {
    this.genreList.sort((a, b) => (a === "Others" ? 1 : b === "Others" ? -1 : a.localeCompare(b)));
    this.bookForm = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      author: ['', Validators.required],
      numberOfPages: [null, [Validators.required, Validators.min(1)]],
      genres: this.genres,
      review: [null, Validators.required],
      description: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this.bookDataService.addEntry(this.bookForm.value);

      this.bookDataService.printData();
    }
  }

  
}