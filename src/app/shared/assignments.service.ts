import { Injectable } from '@angular/core';
import {Assignment} from "../assignments/assignment.model";
import {of, Observable, map, tap, catchError, forkJoin} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {bdInitialAssignments} from "./data";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private loggingService:LoggingService, private http:HttpClient) { }
  url = "https://angular-project-miage-api.onrender.com/api/assignments";
  nbAssignment : number;
  imagesMatieres: { [key: string]: string } = {
    'Comptabilité': '../assets/avatars/rs5.jpeg',
    'Programmation Avancée': '../assets/avatars/g.jpeg',
    'Base de données': '../assets/avatars/amg.jpeg',
    'Développement WEB': '../assets/avatars/m4.jpeg',
    'Marketing': '../assets/avatars/aventador.jpeg',
    'Musique': '../assets/avatars/gt3.jpeg'
  };

  getAssignments(): Observable<Assignment[]>{
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }
  getAssignmentsPagine(page:number, limit:number): Observable<any> {
    return this.http.get<Assignment[]>(this.url + "?page=" + page + "&limit=" + limit);
  }
  addAssignment(assignment:Assignment): Observable<any>{
    this.setDetails(assignment, assignment.matiere);
    return this.http.post<Assignment>(this.url,assignment,this.HttpOptions);
  }

  updateAssignment(assignment:Assignment): Observable<any>{
    //return of("Assignment service: assignment modifié")
    return this.http.put<Assignment>(this.url, assignment);
  }
  deleteAssignment(assignment:Assignment): Observable<any>{
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos,1);
    //return of("Assignment service: assignment supprimé")
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);
  }
  getAssignment(id:number): Observable<Assignment|undefined>{
    //const a: Assignment|undefined = this.assignments.find(a => a.id === id);
    //return of(a);
    return this.http.get<Assignment>(this.url + "/" + id)
      .pipe(
        // map(a=> {
        //   a.nom += "reçu et transformé avec un pipe";
        //   return a;
        // }),
        tap(_=>{
          console.log("tap: assignment avec id ="+id+" requête GET envoyée sur MongoDB cloud")
        }),
        catchError(this.handleError<Assignment>("getAssignment(id=${id})"))

      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation + " a échoué" + error.message);
      return of(result as T);
    };
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.remarques = a.remarques;
      if(nouvelAssignment.rendu){
        nouvelAssignment.note = Math.floor(Math.random() * 20);
      }
      this.setDetails(nouvelAssignment, a.matiere);

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }

  setDetails(assignment:Assignment,data:any){
    switch (data) {
      case "Base de données":
        assignment.professeur = "M. Mopolo";
        assignment.imageMatiere = "../assets/avatars/amg.jpeg";
        break;
      case "Marketing":
        assignment.professeur = "M. Tounsi";
        assignment.imageMatiere = "../assets/avatars/aventador.jpeg";
        break;
      case "Comptabilité":
        assignment.professeur = "M. Anigo";
        assignment.imageMatiere = "../assets/avatars/rs5.jpeg";
        break;
      case "Développement WEB":
        assignment.professeur = "M. Buffa";
        assignment.imageMatiere = "../assets/avatars/m4.jpeg";
        break;
      case "Programmation Avancée":
        assignment.professeur = "M. Lahire";
        assignment.imageMatiere = "../assets/avatars/g.jpeg";
        break;
      case "Musique":
        assignment.professeur = "M. Akalaw";
        assignment.imageMatiere = "../assets/avatars/gt3.jpeg";
        break;
    }
  }

}
