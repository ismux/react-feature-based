import { z } from 'zod'

export const CategoriesApiResponseSchema = z.object({
    drinks: z.array(z.object({
        strCategory: z.string()
    }))
})
export type Categories = z.infer<typeof CategoriesApiResponseSchema>


export const SearchFilterSchema = z.object({
     ingredient: z.string(),
     category: z.string()
})
export type SearchFilter = z.infer<typeof SearchFilterSchema>


export const DrinkApiResponse = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})

export const DrinksApiResponse = z.object({
    drinks: z.array(DrinkApiResponse)
})

export type Drink = z.infer<typeof DrinkApiResponse>
export type Drinks = z.infer<typeof DrinksApiResponse>

export const RecipeAPIResponseSchema = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
  strInstructions: z.string(),
  strIngredient1: z.string().nullable(),
  strIngredient2: z.string().nullable(),
  strIngredient3: z.string().nullable(),
  strIngredient4: z.string().nullable(),
  strIngredient5: z.string().nullable(),
  strIngredient6: z.string().nullable(),
  strMeasure1: z.string().nullable(),
  strMeasure2: z.string().nullable(),
  strMeasure3: z.string().nullable(),
  strMeasure4: z.string().nullable(),
  strMeasure5: z.string().nullable(),
  strMeasure6: z.string().nullable(),
});
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>

export const RecipesAPIResponseSchema = z.object({
    drinks: z.array(RecipeAPIResponseSchema)
})

export type Recipes = z.infer<typeof RecipesAPIResponseSchema>