// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

import { environment } from './environment/environment'; // ✅ Configuración de Firebase

// 🔥 Firebase providers
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { appConfig } from './app/app.config';

// 🚀 Bootstrap de la aplicación Angular + Firebase
(async () => {
  try {
    await bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase App
        provideAuth(() => getAuth()),                                  // Auth
        provideFirestore(() => getFirestore()),                        // Firestore DB
        provideStorage(() => getStorage())                             // Storage
      ]
    });
    console.log('✅ Aplicación Angular iniciada correctamente');
  } catch (err) {
    console.error('❌ Error al iniciar la aplicación:', err);
  }
})();
