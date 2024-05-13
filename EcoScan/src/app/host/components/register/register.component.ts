import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { Credential } from '../../models/crendential.type';
import { UserForm } from '../../models/user.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registrationForm = this._fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    pseudo: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private _fb: FormBuilder, private _hostService: HostService) {}

  onSubmit() {
    if (this.registrationForm.valid) {
      const firstname = this.registrationForm.value.firstname;
      const lastname = this.registrationForm.value.lastname;
      const pseudo = this.registrationForm.value.pseudo;
      const email = this.registrationForm.value.email;
      const password = this.registrationForm.value.password;

      if (!firstname || !lastname || !pseudo || !email || !password) {
        console.error('Les champs du formulaire ne peuvent pas être vides.');
        return;
      }

      const newUser: UserForm = {
        firstname: firstname,
        lastname: lastname,
        pseudo: pseudo,
        email: email,
        password: password,
        points: 10,
        isAdmin: false,
      };

      this._hostService.register$(newUser).subscribe((response) => {
        if (response) {
          console.log('Utilisateur ajouté avec succès :', response);
          this.registrationForm.reset();

          this._hostService.login$(response).subscribe((loggedIn) => {
            if (loggedIn) {
              console.log('Utilisateur connecté avec succès');
            } else {
              console.error("Erreur lors de la connexion de l'utilisateur");
            }
          });
        } else {
          console.error("Erreur lors de l'ajout de l'utilisateur");
        }
      });
    } else {
      console.log('Formulaire invalide.');
    }
  }
}
