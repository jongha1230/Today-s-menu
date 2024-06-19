import supabase from './supabaseAPI';

class RecipeAPI {
  //레시피 추가 메서드
  async postRecipe(recipe) {
    console.log(recipe.imageSrc);
    // const { data: uploadUrl, error: uploadError } = await supabase.storage
    //   .from('images')
    //   .upload('public/images/recipeimages', recipe.imageSrc, {
    //     cacheControl: '3600',
    //     upsert: false
    //   });
    const { data, error } = await supabase.from('recipes').insert({
      recipeId: recipe.id,
      title: recipe.title,
      // userId: user.id,
      // nickname: user.nickname,
      content: recipe.content,
      thumbnail: recipe.imageSrc
    });
  }

  // 레시피 삭제 메서드
  async DeleteRecipe(recipe) {
    const { data, error } = await supabase.from('recipes').delete().eq('recipeId', recipe);
    if (error) {
      console.error('Error deleting recipe:', error);
    } else {
      console.log('Recipe deleted:', data);
    }
  }

  //레시피 수정 메서드
  async UpdateRecipe(recipe) {
    await supabase
      .from('recipes')
      .update({
        title: recipe.title,
        content: recipe.content
      })
      .eq('recipeId', recipe.id);
  }
}

export default RecipeAPI;
