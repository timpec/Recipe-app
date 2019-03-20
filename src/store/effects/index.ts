import { MediaEffects } from "./media.effects";
import { RecipeEffects } from "./recipe.effects";
import { UserEffects } from "./user.effects";

export const effects: any[] = [MediaEffects, UserEffects, RecipeEffects];
export * from "./media.effects";
export * from "./user.effects";
