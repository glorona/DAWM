import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedayComponent } from './pokeday.component';

describe('PokedayComponent', () => {
  let component: PokedayComponent;
  let fixture: ComponentFixture<PokedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
