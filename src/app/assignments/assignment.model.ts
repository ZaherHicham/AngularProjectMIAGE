export class Assignment {
  id!: number;
  _id?: string;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;

  auteur!: string;
  matiere!: string;
  professeur!: string;
  imageMatiere!: string;
  
  note!: number;
  remarques! : string
}
