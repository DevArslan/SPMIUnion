import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: User;

  /*  NOTE:Лучше сервисы везде одинаково называть */
  constructor(private authService: AuthService, private router: Router) {}

  /*NOTE: Неиспользуемые методы лучше убирать */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /* NOTE: Лучше оформить подписку. Так если произойдет логаут, то должен автоматический редайрект сделаться по идее 
      (даже если в копмоненте не будет логики редайректа) */
    this.authService.currentUserObservable.subscribe(
      (user) => (this.user = user)
    );
    if (this.user) {
      // Залогинился и ок
      return true;
    }

    // нет - редайрект
    this.router.navigate(['/auth']);
    return false;
  }
}
