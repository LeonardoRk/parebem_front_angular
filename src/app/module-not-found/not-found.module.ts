import { ModuleNotFoundComponent } from './module-not-found.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations:[
        ModuleNotFoundComponent
    ],
    exports:[ModuleNotFoundComponent]
})
export class NotFoundModule {};