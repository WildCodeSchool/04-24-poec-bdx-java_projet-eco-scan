import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { Credential } from '../../models/credential.type';
import { Message, MessageService } from 'primeng/api';
import { TransitionService } from '../../../shared-module/shared/services/transition.service';

type FieldNames = {
  [key: string]: string;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  messages: { [key: string]: Message[] } = {
    email: [],
    password: [],
  };

  fieldNames: FieldNames = {
    email: "L'email",
    password: 'Le mot de passe',
  };

  loginForm = this._fb.group({
    email: ['user1@user1.com', [Validators.required, Validators.email]],
    password: ['user1', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _hostService: HostService,
    private transitionService: TransitionService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.clearMessages();
    if (this.loginForm.valid) {
      const credentials: Credential = this.loginForm.value as Credential;

      this.transitionService.startTransition();
      this._hostService.login$(credentials).subscribe();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Identifiant incorrect',
      });
      this.validateForm(this.loginForm);
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
