import { NgModule } from '@angular/core';
import { CriarEventoComponent } from './criar-evento.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[CriarEventoComponent],
    exports:[CriarEventoComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule
    ]
})
export class CriarEventoModule {}