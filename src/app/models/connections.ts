// src/app/models/connection.model.ts
export interface DatabaseConnection {
    id?: number;
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    created_at?: string;
    updated_at?: string;
  }
  
  // src/app/models/schema.model.ts
  export interface Schema {
    id?: number;
    name: string;
    description?: string;
    connection: number;
    created_at?: string;
    updated_at?: string;
  }
  
  // src/app/models/table.model.ts
  export interface Column {
    name: string;
    type: string;
    nullable?: boolean;
    defaultValue?: string;
  }
  
  export interface Table {
    name: string;
    columns: Column[];
  }