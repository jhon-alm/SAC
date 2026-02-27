import { Routes } from '@angular/router';
import { FormularioComponent } from './components/componentsac/componentsac';
import { HistoricoComponent } from './components/historico/historico';

export const routes: Routes = [
    { path: '', component: FormularioComponent }, // Rota padrão (vazia) carrega o SAC
    { path: 'reclamar', component: FormularioComponent },
    { path: 'historico', component: HistoricoComponent }
];