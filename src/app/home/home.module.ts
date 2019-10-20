import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { PbNavModule } from '../shared/components/pb-nav/pb-nav.module';

@NgModule({
    declarations:[HomeComponent],
    exports:[HomeComponent],
    imports:[
        CommonModule,
        PbNavModule
    ]
})
export class HomeModule {}