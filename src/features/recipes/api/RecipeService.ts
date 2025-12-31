import { HttpClientType } from "@/types";
import { HttpClientFactory } from "@/utils";
import { type Categories, type Drink, type Drinks, type Recipe, type Recipes, type SearchFilter } from "../types/recipes-schema";


export async function getCategories() {
    try {

        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

        const api = HttpClientFactory.getService(HttpClientType.AXIOS)
        
        const data = await api.get<Categories>(url);

        return data as Categories

    } catch (error) {
        return getCategoriesMock()
    }
}

export async function getRecipes(filters: SearchFilter){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;

    const api = HttpClientFactory.getService(HttpClientType.AXIOS)
    const data = await api.get<Drinks>(url);

    return data as Drinks;
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    const api = HttpClientFactory.getService(HttpClientType.AXIOS)
    const data = await api.get<Recipes>(url) as Recipes;
    
    return data.drinks[0] as Recipe;
}

export async function getCategoriesMock() {
    let dataMock: { strCategory: string }[] = [
        { "strCategory": "Available" },
        { "strCategory": "Ready" },
        { "strCategory": "Started" }
    ];

    var drinks: {
        strCategory: string;
    }[] = dataMock;

    var mk = { drinks }

    return mk
}