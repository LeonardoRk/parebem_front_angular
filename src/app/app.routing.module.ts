import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';
import { IndexComponent } from './index/index.component';
import { ModuleNotFoundComponent } from './module-not-found/module-not-found.component';
import { HomeComponent } from './home/home.component';
import { CadastraUsuarioEventoComponent } from './cadastra-usuario-evento/cadastra-usuario-evento.component';
import { ModuleNotAuthComponent } from './module-not-auth/module-not-auth.component';

const routes: Routes = [
    {path: 'criarUsuarios' , component: CriarUsuarioComponent  },
    {path: 'criarEventos' , component:  CriarEventoComponent},
    {path: '', component: IndexComponent},
    {path: 'home', component: HomeComponent},
    {path: 'cadastrarUsuarioEvento', component: CadastraUsuarioEventoComponent},
    {path: 'naoAutenticado', component: ModuleNotAuthComponent},
    {path: '**', component: ModuleNotFoundComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}