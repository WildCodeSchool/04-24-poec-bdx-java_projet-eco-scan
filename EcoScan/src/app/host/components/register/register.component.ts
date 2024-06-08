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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  submitted = false;
  messages: { [key: string]: Message[] } = {
    firstname: [],
    lastname: [],
    pseudo: [],
    email: [],
    password: [],
  };

  registrationForm = this._fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private messageService: MessageService,
    private _hostService: HostService
  ) {}

  onSubmit() {
    this.submitted = true;
    this.clearMessages();
    if (this.registrationForm.valid) {
      const newUser: UserForm = this.registrationForm.value as UserForm;

      this._hostService.register$(newUser).subscribe((response) => {
        if (response) {
          //  success add user tost
          this.registrationForm.reset();

          this._hostService.login$(response).subscribe((loggedIn) => {
            if (loggedIn) {
              //  Success connect toast
            } else {
              // err lors de la connexion toast
            }
          });
        } else {
          // err lors de l'ajout toast
        }
      });
    } else {
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
    if (control && control.errors) {
      if (control.errors['required']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: `${controlName} est requis`,
        });
      }
      if (control.errors['email']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: `${controlName} n'est pas valide`,
        });
      }
      if (control.errors['password']) {
        this.messages[controlName].push({
          severity: 'error',
          summary: `${controlName} doit contenir une majuscule`,
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
        summary: `${controlName} est valide`,
      });
    }
  }

  private clearMessages() {
    Object.keys(this.messages).forEach((key) => {
      this.messages[key] = [];
    });
  }
}
