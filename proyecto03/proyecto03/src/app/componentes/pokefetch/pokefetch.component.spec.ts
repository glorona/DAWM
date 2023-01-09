import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokefetchComponent } from './pokefetch.component';

describe('PokefetchComponent', () => {
  let component: PokefetchComponent;
  let fixture: ComponentFixture<PokefetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokefetchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokefetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
