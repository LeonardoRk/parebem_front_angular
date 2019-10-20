import { NgModule } from '@angular/core'
import { CriarUsuarioComponent } from './criar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PbLmessageModule } from '../shared/components/pb-lmessage/pb-lmessage.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CriarUsuarioComponent],
    exports: [CriarUsuarioComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        PbLmessageModule
    ]
})
export class UsuarioModule {}