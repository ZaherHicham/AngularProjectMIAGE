import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarConnexionComponent } from './toolbar-connexion.component';

describe('ToolbarConnexionComponent', () => {
  let component: ToolbarConnexionComponent;
  let fixture: ComponentFixture<ToolbarConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarConnexionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
