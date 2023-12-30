import { recipe as Recipe, user as User } from '@prisma/client';
import RecipeRepository from '../repository/recipe.repository';
import RecipeMapper from '../mappers/recipe.mapper';
import { RecipeListingDto } from '../dtos/recipeListing.dto';
import { RecipeDto } from '../dtos/recipe.dto';

export default class RecipeService {
    private recipeMapper: RecipeMapper = new RecipeMapper();
    private recipeRepository: RecipeRepository = new RecipeRepository();

    public async findRecipes(): Promise<RecipeListingDto[]> {
        try {
            const recipes: Recipe[] = await this.recipeRepository.findAllRecipes();
            const recipeListingDtos = recipes.map((recipe) => this.recipeMapper.recipeToRecipeListingDto(recipe))
            return recipeListingDtos;
        } catch (e) {
            throw e;
        }
    }

    public async getRecipeById(recipeId: string): Promise<RecipeDto> {
        try {
            const recipe: Recipe = await this.recipeRepository.findRecipeById(recipeId);
            const recipeDto = this.recipeMapper.recipeToRecipeDto(recipe);
            return recipeDto;
        } catch (e) {
            throw e;
        }
    }

    public async createRecipe(user: User): Promise<RecipeDto> {
        try {
            let recipe: Recipe = {} as Recipe;
            recipe.created_by = user.email;
            recipe.user_id = user.id;
            recipe.name = 'Blank Recipe';
            recipe.prep_time_hours = 0;
            recipe.prep_time_minutes = 0;
            recipe.cook_time_hours = 0;
            recipe.cook_time_minutes = 0;

            recipe = await this.recipeRepository.createRecipe(recipe);
            const recipeDto = this.recipeMapper.recipeToRecipeDto(recipe);
            return recipeDto;
        } catch (e) {
            throw e;
        }
    }

    public async updateRecipe(recipeId: string, recipe: Recipe, user: User): Promise<RecipeDto> {
        try {
            recipe.updated_by = user.email;
            recipe.updated_ts = new Date();

            const recipeDto = this.recipeMapper.recipeToRecipeDto(recipe);
            return recipeDto;
        } catch (e) {
            throw e;
        }
    }

    public async deleteRecipe(recipeId: string): Promise<void> {
        try {
            await this.recipeRepository.deleteRecipe(recipeId);
        } catch (e) {
            throw e;
        }
    }
}