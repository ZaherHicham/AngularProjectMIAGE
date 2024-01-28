import {Component, OnInit, ViewChild} from '@angular/core';
import { Assignment } from "./assignment.model";
import {AssignmentsService} from "../shared/assignments.service";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {MatSort,Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AuthService} from "../shared/auth.service";
import { log } from 'console';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les Assignments !";
  ajoutActive = false;
  assignmentSelectionne: Assignment;
  formVisible = false;
  assignments: Assignment[];
  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  displayedColumns: string[] = ['numero','nom', 'dateDeRendu', 'rendu','note', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tabAssignments: any;


  constructor(private assignmentService:AssignmentsService, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
    this.getAssignments();
  }
  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
    this.router.navigate(['/assignment/', assignment.id]);
  }
  onAddAssignmentbtnClick(){
    this.formVisible = true;
  }

  getAssignments(){
    this.assignmentService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");
        console.log(data);
        this.tabAssignments = new MatTableDataSource(this.assignments);
        this.tabAssignments.sort = this.sort;
        this.tabAssignments.paginator = this.paginator;
        this.assignmentService.nbAssignment = this.totalDocs;
      });
}
  onNouvelAssignment(event:Assignment){
    this.assignmentService.addAssignment(event)
      .subscribe(message => console.log(message));
    this.formVisible = false;
  }

  testChangement(sortState: Sort) {
    console.log("testChangement");
    console.log(sortState);
  }

  changementPage($event: PageEvent) {
    console.log("changementPage");
    console.log($event);
    this.page = $event.pageIndex + 1;
    this.limit = $event.pageSize;
    this.replaceData();
  }
  replaceData() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");
        console.log(data);
        this.tabAssignments = new MatTableDataSource(this.assignments);
        this.tabAssignments.sort = this.sort;
      });
  }
  isLogged(){
    return this.authService.getLoggedIn();
  }
}


