import { streamText } from 'ai'
import { openrouter } from './ai.service.core';

export default {
    async generateRecipe(prompt: string){
         const response = streamText({
            model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
            prompt,
            system: 'Eres un experto en recetas de comida y cócteles. Responde solo con la receta solicitada, sin explicaciones adicionales, incluyendo al final un chiste malo.',
            temperature: 1,
        });

        return response.textStream;
    }
}