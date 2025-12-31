import { type StateCreator } from "zustand"
import AIService from "../features/recipes/api/AIService"

export type AISliceType = {
    recipe: string,
    isGenerating: boolean,
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice : StateCreator<AISliceType, [], [], AISliceType> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {     
        set({ recipe: '', isGenerating: true }) 
        const data = await AIService.generateRecipe(prompt);
        for await (const part of data) {
           set((state => ({
                recipe: state.recipe + part
           })));
        }
        set({ isGenerating: false })
    }
})