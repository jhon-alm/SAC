import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Componentsac } from './componentsac';

describe('Componentsac', () => {
  let component: Componentsac;
  let fixture: ComponentFixture<Componentsac>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Componentsac]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Componentsac);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
