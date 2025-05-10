import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaManagementComponent } from './schema-management.component';

describe('SchemaManagementComponent', () => {
  let component: SchemaManagementComponent;
  let fixture: ComponentFixture<SchemaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
