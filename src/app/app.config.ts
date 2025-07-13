import { provideRouter, Routes } from '@angular/router';

// 🧭 Layout general (público)
import { LayoutComponent } from './layout/layout';
import { InicioComponent } from './pages/inicio/inicio';
import { PlantasComponent } from './pages/plantas/plantas';
import { CuidadoComponent } from './pages/cuidado/cuidado';
import { MacetasComponent } from './pages/macetas/macetas';
import { SustractosComponent } from './pages/sustractos/sustractos';
import { CarritoComponent } from './pages/carrito/carrito';
import { PromocionesComponent } from './pages/promociones/promociones';
import { DetalleEnvioComponent } from './pages/detalle-envio/detalle-envio';

// 🔐 Login standalone (lazy-loaded)
const LoginComponent = () =>
  import('./pages/login/login').then(m => m.LoginComponent);

// ⚡ Panel administrador standalone (lazy-loaded)
const AdminComponent = () =>
  import('./pages/admin/admin').then(m => m.AdminComponent);
const ProductosComponent = () =>
  import('./pages/admin/productos/productos').then(m => m.ProductosComponent);
const CategoriasComponent = () =>
  import('./pages/admin/categoria/categoria').then(m => m.CategoriasComponent);
const UsuariosComponent = () =>
  import('./pages/admin/usuarios/usuarios').then(m => m.UsuariosComponent);
const PedidosComponent = () =>
  import('./pages/admin/pedidos/pedidos').then(m => m.PedidosComponent);
const OfertasComponent = () =>
  import('./pages/admin/ofertas/ofertas').then(m => m.OfertasComponent);

// 🔐 Guards
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'plantas', component: PlantasComponent },
      { path: 'cuidado', component: CuidadoComponent },
      { path: 'macetas', component: MacetasComponent },
      { path: 'sustractos', component: SustractosComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'promociones', component: PromocionesComponent },
      { path: 'detalle-envio', component: DetalleEnvioComponent }
    ]
  },
  // 🔐 Login fuera del layout público
  {
    path: 'login',
    loadComponent: LoginComponent
  },
  // ⚡ Admin con rutas hijas protegidas
  {
    path: 'admin',
    loadComponent: AdminComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'productos', loadComponent: ProductosComponent },
      { path: 'categorias', loadComponent: CategoriasComponent },
      { path: 'usuarios', loadComponent: UsuariosComponent },
      { path: 'pedidos', loadComponent: PedidosComponent },
      { path: 'ofertas', loadComponent: OfertasComponent },
      { path: '', redirectTo: 'productos', pathMatch: 'full' } // Redirección por defecto
    ]
  },
  // 🔄 Ruta comodín: redirige a home
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

export const appConfig = {
  providers: [
    provideRouter(routes)
  ]
};
