import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { UserForm } from '../../models/user.type';
import { Message, MessageService } from 'primeng/api';

type FieldNames = {
  [key: string]: string;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  messages: { [key: string]: Message[] } = {
    firstname: [],
    lastname: [],
    username: [],
    email: [],
    password: [],
  };

  fieldNames: FieldNames = {
    firstname: 'Le prénom',
    lastname: 'Le nom',
    username: 'Le pseudo',
    email: "L'email",
    password: 'Le mot de passe',
  };

  registrationForm = this._fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private messageService: MessageService,
    private _fb: FormBuilder,
    private _hostService: HostService
  ) {}

  onSubmit() {
    this.clearMessages();
    if (this.registrationForm.valid) {
      const newUser: UserForm = this.registrationForm.value as UserForm;

      this._hostService.register$(newUser).subscribe();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Formulaire invalide',
      });
      this.validateForm(this.registrationForm);
    }
  }

  private validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.validateForm(control);
      } else {
        if (control) this.showValidationMessages(control, key);
      }
    });
  }

  private showValidationMessages(
    control: AbstractControl,
    controlName: string
  ) {
    const fieldName = this.fieldNames[controlName];
    if (control && control.errors) {
      if (control.errors['required']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: `${fieldName} est requis`,
        });
      }
      if (control.errors['email']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: `L'adresse email n'est pas valide`,
        });
      }
      if (control.errors['password']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: `Le mot de passe n'est pas assez robuste`,
        });
      }
      if (control.errors['mismatch']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: control.errors['mismatch'].rules,
        });
      }
    } else {
      this.messages[controlName].push({
        severity: 'success',
        summary: `${fieldName} est valide`,
      });
    }
  }

  private clearMessages() {
    Object.keys(this.messages).forEach((key) => {
      this.messages[key] = [];
    });
  }
}
