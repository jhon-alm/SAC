import { Routes } from '@angular/router';
import { FormularioComponent } from './components/componentsac/componentsac'; 

export const routes: Routes = [
    { path: '', component: FormularioComponent }, // Rota padrão (vazia) carrega o SAC
    { path: 'reclamar', component: FormularioComponent }
];