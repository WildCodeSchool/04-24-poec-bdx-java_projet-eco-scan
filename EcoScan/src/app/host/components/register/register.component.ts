import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { Users } from '../../models/user.type';
import { Credential } from '../../models/crendential.type';
import { switchMap, tap } from 'rxjs';

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
      const newUser = {
        firstname: this.registrationForm.value.firstname,
        lastname: this.registrationForm.value.lastname,
        pseudo: this.registrationForm.value.pseudo,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        points: 10,
        isAdmin: false,
      };
      console.log(newUser);

      if (!newUser.email || !newUser.password) {
        console.error(
          "Erreur lors de l'obtention des informations d'utilisateur"
        );
        return;
      }

      this._hostService
        .getUsers$()
        .pipe(
          tap((users) => console.log(users)),
          switchMap((users) => {
            console.log(users);

            const emailExists = users.find(
              (user) => user.email === newUser.email
            );
            const pseudoExists = users.find(
              (user) => user.pseudo === newUser.pseudo
            );

            if (emailExists) {
              console.log('Cet email existe déjà.');
              return [];
            } else if (pseudoExists) {
              console.log('Ce pseudo est déjà utilisé.');
              return [];
            } else {
              return this._hostService.postUser$(newUser as Users);
            }
          }),
          switchMap((response) => {
            if (response) {
              console.log('Utilisateur ajouté avec succès :', response);
              this.registrationForm.reset();
              const credentials = {
                email: response.email,
                password: response.password,
              };
              return this._hostService.login$(credentials as Credential);
            } else {
              return [];
            }
          })
        )
        .subscribe((result) => {
          console.log('Inscription terminée avec succès :', result);
        });
    } else {
      console.log('Formulaire invalide.');
    }
  }
}
