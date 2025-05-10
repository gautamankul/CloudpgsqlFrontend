import { Routes } from '@angular/router';
import { HomeComponent } from './comman/home/home.component';
import { AboutComponent } from './comman/about/about.component';
import { NotFoundComponent } from './comman/not-found/not-found.component';
import { SchemaManagementComponent } from './management/schema-management/schema-management.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    // { path: '**', component: NotFoundComponent },
    { path: 'schema', component: SchemaManagementComponent },
];
