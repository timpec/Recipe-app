import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeViewPage } from './recipe-view';

@NgModule({
  declarations: [
    RecipeViewPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeViewPage),
  ],
})
export class RecipeViewPageModule {}
