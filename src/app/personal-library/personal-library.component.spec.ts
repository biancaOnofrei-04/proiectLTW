import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLibraryComponent } from './personal-library.component';

describe('PersonalLibraryComponent', () => {
  let component: PersonalLibraryComponent;
  let fixture: ComponentFixture<PersonalLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
