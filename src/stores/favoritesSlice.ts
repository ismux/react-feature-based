import { StateCreator } from "zustand"
import { Recipe } from "../pages/bebidas/models/recipes-schema"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"
import { RecipesSliceType } from "./recipeSlice"

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => Promise<void>,
    favoriteExists: (idDrink: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, 
                                                [], [], FavoritesSliceType> = (set, get, api) =>
({
    favorites: [],
    handleClickFavorite: async (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(fav => fav.idDrink
                    !== recipe.idDrink
                )
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Bebida eliminada de favoritos',
                error: false
            })
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Bebida agregada a favoritos',
                error: false
            })
            //Alternativa sin callback:
            /*
            set({
                favorites: [...get().favorites, recipe]
            })
            */
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
        //createRecipesSlice(set, get, api)
    },
    favoriteExists: (idDrink) => {
        return get().favorites.some(fav => fav.idDrink === idDrink)
    },
    loadFromStorage: () => {
        const storedFav = localStorage.getItem('favorites');

        if (storedFav) {
            set({
                favorites: JSON.parse(storedFav)
            })
        }
    }
})
