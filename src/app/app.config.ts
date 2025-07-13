// src/app/app.config.ts
import { provideRouter, Routes } from '@angular/router';

// 🧭 Layout general del sitio público
import { LayoutComponent }            from './layout/layout';
import { InicioComponent }            from './pages/inicio/inicio';
import { PlantasComponent }           from './pages/plantas/plantas';
import { MacetasComponent }           from './pages/macetas/macetas';
import { SustratosComponent }         from './pages/sustratos/sustratos';
import { CuidadosComponent }          from './pages/cuidados/cuidados'; // ✅ NUEVO: Cuidados
import { PaquetesComponent }          from './pages/paquetes/paquetes';
import { CarritoComponent }           from './pages/carrito/carrito';
import { PromocionesComponent }       from './pages/promociones/promociones';
import { DetalleEnvioComponent } from './pages/detalle-envio/detalle-envio'; 

// 🔐 Guards
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

// ⚡ Lazy-loaded standalone components para admin
const AdminComponent = () =>
  import('./pages/admin/admin').then(m => m.AdminComponent);
const ProductosComponent = () =>
  import('./pages/admin/productos/productos').then(m => m.ProductosComponent);
const CategoriasComponent = () =>
  import('./pages/admin/categoria/categoria').then(m => m.CategoriasComponent);
const UsuariosComponent = () =>
  import('./pages/admin/usuarios/usuarios').then(m => m.UsuariosComponent);
const OfertasComponent = () =>
  import('./pages/admin/ofertas/ofertas').then(m => m.OfertasComponent);

// ⚡ Login lazy-loaded
const LoginComponent = () =>
  import('./pages/login/login').then(m => m.LoginComponent);

const routes: Routes = [
  // 🌐 Rutas públicas
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '',                 component: InicioComponent },
      { path: 'plantas',          component: PlantasComponent },
      { path: 'macetas',          component: MacetasComponent },
      { path: 'sustratos',        component: SustratosComponent },
      { path: 'cuidados',         component: CuidadosComponent },
      { path: 'paquetes',         component: PaquetesComponent },
      { path: 'carrito',          component: CarritoComponent },
      { path: 'promociones',      component: PromocionesComponent },
      { path: 'detalle-envio',      component: DetalleEnvioComponent }
      // 🛑 ❌ Ruta vacía eliminada: no tenía path ni componente definido
    ]
  },

  // 🔐 Login fuera del layout público
  { path: 'login', loadComponent: LoginComponent },

  // ⚡ Rutas del panel Admin (layout independiente)
  {
    path: 'admin',
    loadComponent: AdminComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'productos',  loadComponent: ProductosComponent },
      { path: 'categorias', loadComponent: CategoriasComponent },
      { path: 'usuarios',   loadComponent: UsuariosComponent },
      { path: 'ofertas',    loadComponent: OfertasComponent },
      { path: '', redirectTo: 'productos', pathMatch: 'full' } // Redirección por defecto
    ]
  },

  // 🌐 Cualquier otra ruta redirige a home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const appConfig = {
  providers: [provideRouter(routes)]
};
