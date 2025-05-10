// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


// import { provideAnimations } from '@angular/platform-browser/animations';

// bootstrapApplication(AppComponent, {
//   providers: [provideAnimations()]
// });

// import { bootstrapApplication } from '@angular/platform-browser';


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideToastr()
  ]
});