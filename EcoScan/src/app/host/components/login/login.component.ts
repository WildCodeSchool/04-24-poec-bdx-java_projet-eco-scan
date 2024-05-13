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
    email: [
      'h-mamou@hotmdfsdfsdail.fr',
      [Validators.required, Validators.email],
    ],
    password: ['fsdfsdfsdfds', [Validators.required]],
  });

  constructor(private _fb: FormBuilder, private _hostService: HostService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credential = this.loginForm.value as Credential;

      this._hostService.login$(credentials).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('Utilisateur connecté avec succès !');
        } else {
          console.log('Identifiants incorrects.');
        }
      });
    } else {
      console.log('Formulaire invalide.');
    }
  }
}