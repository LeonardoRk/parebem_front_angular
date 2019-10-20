import { NgModule } from '@angular/core'
import { CadastraUsuarioEventoComponent } from './cadastra-usuario-evento.component';
import { CommonModule } from '@angular/common';
import { PbNavModule } from '../shared/components/pb-nav/pb-nav.module';
import { PbUsuariosEventoModule } from '../shared/components/pb-usuarios-evento/pb-usuarios-evento.module';
import { PbAutoCompleteModule } from '../shared/components/pb-autocomplete/pb-autocomplete.module';

@NgModule({
    declarations:[CadastraUsuarioEventoComponent],
    exports:[CadastraUsuarioEventoComponent],
    imports:[CommonModule, PbNavModule, PbUsuariosEventoModule, PbAutoCompleteModule]
})
export class CadastraUsuarioEventoModule{}