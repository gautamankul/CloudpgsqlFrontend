import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Schema, Column } from '../../models/connections';
import { DatabaseConnection } from '../../models/connections';
import { SchemaService } from '../../services/schema.service';
import { ConnectionService } from '../../services/connection.service';
import { CreateTableDialogComponent } from '../dialog/create-table-dialog/create-table-dialog.component';
// other important
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@Component({
  selector: 'app-schema-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule
  ],
  templateUrl: './schema-management.component.html',
  styleUrl: './schema-management.component.scss'
})
export class SchemaManagementComponent {
  schemas: Schema[] = [];
  connections: DatabaseConnection[] = [];
  selectedSchema: Schema | null = null;
  tables: string[] = [];
  schemaForm!: FormGroup;
  isLoading = false;

  constructor(
    private schemaService: SchemaService,
    private connectionService: ConnectionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.schemaForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-z0-9_]+$/)]],
      description: [''],
      connection: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadConnections();
    this.loadSchemas();
  }

  loadConnections(): void {
    this.connectionService.getConnections().subscribe(
      (connections) => {
        this.connections = connections;
      },
      (error) => {
        this.toastr.error('Failed to load connections');
        console.error(error);
      }
    );
  }

  loadSchemas(): void {
    this.isLoading = true;
    this.schemaService.getSchemas().subscribe(
      (schemas) => {
        this.schemas = schemas;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Failed to load schemas');
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  createSchema(): void {
    if (this.schemaForm.valid) {
      const schema: Schema = this.schemaForm.value;
      this.isLoading = true;

      this.schemaService.createSchema(schema).subscribe(
        (newSchema) => {
          this.schemas.push(newSchema);
          this.schemaForm.reset();
          this.toastr.success('Schema created successfully');
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error('Failed to create schema');
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }

  selectSchema(schema: Schema): void {
    this.selectedSchema = schema;
    this.loadTables(schema.id!);
  }

  loadTables(schemaId: number): void {
    this.isLoading = true;
    this.schemaService.getTables(schemaId).subscribe(
      (tables) => {
        this.tables = tables;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Failed to load tables');
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  openCreateTableDialog(): void {
    if (!this.selectedSchema) {
      this.toastr.warning('Please select a schema first');
      return;
    }

    const dialogRef = this.dialog.open(CreateTableDialogComponent, {
      width: '600px',
      data: { schemaId: this.selectedSchema.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTables(this.selectedSchema!.id!);
      }
    });
  }

  deleteSchema(schema: Schema): void {
    if (confirm(`Are you sure you want to delete schema "${schema.name}"? All tables and data will be permanently deleted.`)) {
      this.isLoading = true;
      this.schemaService.deleteSchema(schema.id!).subscribe(
        () => {
          this.schemas = this.schemas.filter(s => s.id !== schema.id);
          if (this.selectedSchema && this.selectedSchema.id === schema.id) {
            this.selectedSchema = null;
            this.tables = [];
          }
          this.toastr.success('Schema deleted successfully');
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error('Failed to delete schema');
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }


}
