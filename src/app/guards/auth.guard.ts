// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const auth   = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map(user => {
      if (user) return true;          // ✅ sesión válida
      router.navigateByUrl('/login'); // ❌ sin sesión → /login
      return false;
    })
  );
};


