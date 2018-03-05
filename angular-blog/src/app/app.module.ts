import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlogService } from './blog.service';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from './/app-routing.module';
import { PreviewComponent } from './preview/preview.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ListComponent,
    PreviewComponent
  ],
  imports: [
  	FormsModule,
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
