import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipieComponent } from './view-recipie.component';

describe('ViewRecipieComponent', () => {
  let component: ViewRecipieComponent;
  let fixture: ComponentFixture<ViewRecipieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecipieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
