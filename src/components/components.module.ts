import { NgModule } from '@angular/core';
import { CardRecipeComponent } from './card-recipe/card-recipe';
import { CardCommentComponent } from './card-comment/card-comment';
@NgModule({
	declarations: [CardRecipeComponent,
    CardCommentComponent],
	imports: [],
	exports: [CardRecipeComponent,
    CardCommentComponent]
})
export class ComponentsModule {}
