import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../pages/bebidas/services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../pages/bebidas/models/recipes-schema"


export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>,
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    changeModal: (isOpen: boolean) => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: { } as Recipe, // de esta forma no hay que inicializar el objeto con todas las propiedades
    modal: false,
    fetchCategories: async () => {
       const categories = await getCategories()
       set({
        categories 
       })
    },
    searchRecipes: async (filters) => {
       const drinks = await getRecipes(filters);
       set({
        drinks
       })
    }, 
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id);
        set({
            selectedRecipe,
            modal: true
        })
    },
    changeModal: (isOpen: boolean) => {
        set({
            modal: isOpen
        })
    }
})