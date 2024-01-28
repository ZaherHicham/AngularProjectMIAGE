import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Assignment} from "../assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis!: Assignment;
  @Output() supprimeAssignment = new EventEmitter<Assignment>;

  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAssignment();
  }

  deleteButton() {
    //this.supprimeAssignment.emit(this.assignmentTransmis);
    //this.assignmentTransmis = null;
    this.assignmentService.deleteAssignment(this.assignmentTransmis).subscribe((message) => {
      console.log(message)
      this.assignmentTransmis = null;
      this.router.navigate(['/home']);
    });

  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;
    this.assignmentService.updateAssignment(this.assignmentTransmis).subscribe(message => {
      console.log(message)
      this.router.navigate(['/home']);
    });

  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
      {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'});
  }

  isAdmin(): boolean {
    return this.authService.isUserAdmin;
  }
  isLogged(): boolean {
    return this.authService.loggedIn;
  }
}
