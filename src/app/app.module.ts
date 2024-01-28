import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule, Routes} from "@angular/router";
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentDetailComponent} from "./assignments/assignment-detail/assignment-detail.component";
import { RenduDirective } from './shared/rendu.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HttpClientModule} from "@angular/common/http";
import { ToolbarConnexionComponent } from './toolbar-connexion/toolbar-connexion.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { YesNoPipe } from './yes-no.pipe';
import {MatSelectModule} from "@angular/material/select";
import { NotePipe } from './note.pipe';
import {AuthInterceptorInterceptor} from "./shared/auth-interceptor.interceptor";
import {MatSidenavModule} from '@angular/material/sidenav';

// @ts-ignore

const routes: Routes = [
  {path: '', component: AssignmentsComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent},
  {path: 'assignment/:id', component: AssignmentDetailComponent},
  {path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard]},
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    ToolbarConnexionComponent,
    YesNoPipe,
    NotePipe
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        RouterModule.forRoot(routes),
        MatSlideToggleModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSidenavModule,
    ],
  providers: [AuthInterceptorInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
