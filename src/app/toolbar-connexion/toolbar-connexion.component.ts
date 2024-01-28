import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder,Validators} from "@angular/forms";
import {AuthService} from "../shared/auth.service";


@Component({
  selector: 'app-toolbar-connexion',
  templateUrl: './toolbar-connexion.component.html',
  styleUrls: ['./toolbar-connexion.component.css']
})
export class ToolbarConnexionComponent implements OnInit {
  connexionForm = this.fb.group({
    pseudo: ['', Validators.required],
    motDePasse: ['',Validators.required]
  });
  hide = true;
  isAdmin = false;
  isLoggedIn = false;
  username = '';

  @Output() menuClicked = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
  }
  // @ts-ignore
  getErrorPseudoMessage() {
    if (this.connexionForm.get('pseudo').hasError('required')) {
      return 'Vous devez entrer un pseudo';
    }
  }
  // @ts-ignore
  getErrorMotDePasseMessage() {
    if (this.connexionForm.get('motDePasse').hasError('required')) {
      return 'Vous devez entrer un mot de passe';
    }
  }

  onSubmitConnexion() {
    this.authService.logIn(this.connexionForm.get('pseudo').value, this.connexionForm.get('motDePasse').value)
      .subscribe(data => {
        console.log(data);
        this.authService.loggedIn = true;
        this.authService.isUserAdmin = data.isAdmin;
        this.authService.username = data.pseudo;
        this.isLoggedIn = this.authService.loggedIn;
        this.isAdmin = this.authService.isUserAdmin;
        this.username = this.authService.username;
      })
  }

  onSubmitInscription() {
    this.authService.signUp(this.connexionForm.get('pseudo').value, this.connexionForm.get('motDePasse').value,this.isAdmin)
      .subscribe(data => {
        console.log(data);
        this.onSubmitConnexion();
      })
  }

  onSubmitDeconnexion(){
    this.authService.logOut();
    this.isLoggedIn = this.authService.loggedIn;
    this.isAdmin = this.authService.isUserAdmin;
    this.username = this.authService.username;
    this.connexionForm.reset();
  }

  onClickMenu(){
    this.menuClicked.emit();
  }

  setAdmin() {
    this.isAdmin = !this.isAdmin;
  }
}
