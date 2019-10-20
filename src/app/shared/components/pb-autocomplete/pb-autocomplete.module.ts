import { NgModule } from '@angular/core';
import { PbAutocompleteComponent } from './pb-autocomplete.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations:[PbAutocompleteComponent],
    exports:[PbAutocompleteComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule, 
        MatAutocompleteModule,
        MatInputModule]
})
export class PbAutoCompleteModule {}