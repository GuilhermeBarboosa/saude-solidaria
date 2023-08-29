import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEspecComponent } from './create-espec.component';

describe('CreateEspecComponent', () => {
  let component: CreateEspecComponent;
  let fixture: ComponentFixture<CreateEspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEspecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
