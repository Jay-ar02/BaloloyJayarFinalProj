import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getIdToken().pipe(
      take(1),
      switchMap(token => {
        if (token) {
          console.log('Already logged in');
          this.router.navigate(['/post-list']);
          return of(false);
        }
        return of(true);
      }),
      tap(notLoggedIn => {
        console.log('Not logged in:', notLoggedIn);
        if (!notLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}