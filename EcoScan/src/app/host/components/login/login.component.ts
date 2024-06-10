import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostService } from '../../shared/host.service';
import { Credential } from '../../models/crendential.type';
import { TransitionService } from '../../../shared-module/shared/transition.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this._fb.group({
    email: ['h-mamou@hotmail.fr', [Validators.required, Validators.email]],
    password: ['sdfsdfsdf', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _hostService: HostService,
    private transitionService: TransitionService,
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credential = this.loginForm.value as Credential;

      this.transitionService.startTransition();
      this._hostService.login$(credentials).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          //  success connect toast
        } else {
          //  incorrect user toast
        }
      });
    } else {
      //  invalid form toast
    }
  }
}
