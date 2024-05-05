import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { Credential } from '../../models/crendential.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private _fb: FormBuilder, private _hostService: HostService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credential = this.loginForm.value as Credential;

      this._hostService.login$(credentials).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('Utilisateur connecté avec succès !');
          // TODO redirection vers Landing-page plutot dans le service
          //  pour que register puisse aussi en profiter !!
        } else {
          console.log('Identifiants incorrects.');
        }
      });
    } else {
      console.log('Formulaire invalide.');
    }
  }
}