import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { UsuarioModule } from './criar-usuario/usuario.module';
import { NotFoundModule } from './module-not-found/not-found.module';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { CriarEventoModule } from './criar-evento/criar-evento.module';
import { CadastraUsuarioEventoModule } from './cadastra-usuario-evento/cadastra-usuario-evento.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PbNavModule } from './shared/components/pb-nav/pb-nav.module';
import { PbUsuariosEventoModule } from './shared/components/pb-usuarios-evento/pb-usuarios-evento.module';
import { PbAutoCompleteModule } from './shared/components/pb-autocomplete/pb-autocomplete.module';
import { ModuleNotAuthComponent } from './module-not-auth/module-not-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ModuleNotAuthComponent,
  ],
  imports: [
    BrowserModule,
    UsuarioModule,
    NotFoundModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HomeModule,
    PbNavModule,
    CriarEventoModule,
    CadastraUsuarioEventoModule,
    PbUsuariosEventoModule,
    PbAutoCompleteModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
