import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPplacePage } from './new-pplace';

@NgModule({
  declarations: [
    NewPplacePage,
  ],
  imports: [
    IonicPageModule.forChild(NewPplacePage),
  ],
})
export class NewPplacePageModule {}
