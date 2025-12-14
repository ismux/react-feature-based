import { create } from 'zustand'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'
import { createFavoritesSlice, FavoritesSliceType } from './favoritesSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'
import { createAISlice, AISliceType } from './aiSlice'
import { devtools } from 'zustand/middleware'
/*
Cada Slice compone el Store global, se utiliza "create" para agregarlos
al state junto con sus acciones
Mediante "...a" le pasamos al createRecipesSlice una copia de todos 
los argumentos (funciones para obtener y guardar en el state)
*/
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISliceType>()(devtools((...a) => ({
// Mediante "..." le pasamos una copia de createRecipesSlice
   ...createRecipesSlice(...a),
   ...createFavoritesSlice(...a),
   ...createNotificationSlice(...a),
   ...createAISlice(...a)
})))