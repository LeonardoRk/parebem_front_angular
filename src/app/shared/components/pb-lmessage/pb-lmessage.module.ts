import {NgModule} from '@angular/core';
import { PbLmessageComponent } from './pb-lmessage.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[PbLmessageComponent],
    exports:[PbLmessageComponent]
})
export class PbLmessageModule{};