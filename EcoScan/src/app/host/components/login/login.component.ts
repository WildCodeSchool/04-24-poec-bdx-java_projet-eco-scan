import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { Credential } from '../../models/credential.type';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this._fb.group({
    email: ['user1@user1.com', [Validators.required, Validators.email]],
    password: ['user1', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _hostService: HostService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credential = this.loginForm.value as Credential;

      this._hostService.login$(credentials).subscribe();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Formulaire invalide',
      });
    }
  }
}
