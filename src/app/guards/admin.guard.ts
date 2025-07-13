// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const adminGuard = (): Observable<boolean> => {
  const auth   = inject(Auth);
  const fs     = inject(Firestore);
  const router = inject(Router);

  return authState(auth).pipe(
    switchMap(user => {
      if (!user) {
        router.navigateByUrl('/login');
        return of(false);
      }
      const ref = doc(fs, 'users', user.uid);
      return from(getDoc(ref)).pipe(
        map(snap => {
          const data = snap.data();
          // <<< aquí el cambio:
          const role = data?.['role'] as string|undefined;

          if (role === 'admin') {
            return true;
          } else {
            router.navigateByUrl('/');
            return false;
          }
        })
      );
    })
  );
};


