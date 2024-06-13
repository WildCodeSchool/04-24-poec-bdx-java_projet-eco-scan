import { ResolveFn } from '@angular/router';

import { UserService } from '../services/user.service';
import { GetUser } from '../../models/types/getUser.type';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export const userResolver: ResolveFn<Observable<GetUser>> = (route, state) => {
  const userService = inject(UserService);

  const currentUser = userService.getUser$();

  return currentUser;
};
