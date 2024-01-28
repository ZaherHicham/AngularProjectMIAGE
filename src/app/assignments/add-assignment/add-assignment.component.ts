import { Component,EventEmitter, OnInit,Output } from '@angular/core';
import {Assignment} from "../assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  //@Output() nouvelAssignment  = new EventEmitter<Assignment>();
  nomDevoir:string = "";
  nomEleve:string = "";
  listeMatieres = ['Comptabilité','Programmation Avancée','Base de données','Développement WEB','Marketing','Musique'];
  dateDeRendu:Date;
  controlMatiere;
  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
    this.controlMatiere = new FormControl(this.listeMatieres[0], Validators.required);
  }
  onSubmit() {
    const newAssignement = new Assignment();
    newAssignement.id = this.assignmentsService.nbAssignment+Math.floor(Math.random() * 1000);
    newAssignement.nom = this.nomDevoir;
    newAssignement.dateDeRendu = this.dateDeRendu;
    newAssignement.rendu = false;
    newAssignement.eleve = this.nomEleve;
    newAssignement.matiere = this.controlMatiere.value;
    newAssignement.avatar = '';

    //this.assignments.push(newAssignement);
   // this.nouvelAssignment.emit(newAssignement);
    this.assignmentsService.addAssignment(newAssignement).subscribe(message => console.log(message));
  }

}
