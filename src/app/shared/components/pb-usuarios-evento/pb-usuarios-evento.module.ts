import { NgModule } from '@angular/core';
import { PbUsuariosEventoComponent } from './pb-usuarios-evento.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations:[PbUsuariosEventoComponent],
    exports:[PbUsuariosEventoComponent],
    imports:[CommonModule]
})
export class PbUsuariosEventoModule {}