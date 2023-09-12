import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from "./pipes/pipes.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ServicesModule} from "./services/services.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
    ServicesModule
  ],
  exports: [
    PipesModule,
    ServicesModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {
}
