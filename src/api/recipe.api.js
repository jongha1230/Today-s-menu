import supabase from './supabaseAPI';

class RecipeAPI {
  //레시피 추가 메서드
  async postRecipe(recipe, file, userId, nickname) {
    let thumbnailUrl = ''; // 기본적으로 빈 문자열 또는 기본 이미지 URL로 설정
    // 파일이 있는 경우에만 이미지 업로드 시도
    if (file) {
      // 스토리지에 이미지 저장
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`recipeimages/${recipe.id}.${file.name.split('.').pop()}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }

      thumbnailUrl = 'public/images/' + uploadData.path;
    }

    // 레시피 데이터베이스에 추가
    const { data, error } = await supabase.from('recipes').insert({
      id: recipe.id,
      title: recipe.title,
      user_id: userId,
      nickname: nickname,
      content: recipe.content,
      thumbnail: thumbnailUrl
    });

    if (error) {
      console.error('Error inserting recipe:', error);
    } else {
      console.log('Recipe inserted successfully:', data);
    }
  }

  // 레시피 삭제 메서드
  async DeleteRecipe(recipe) {
    // 레시피 썸네일 url 선택
    const { data: thumbnailData } = await supabase.from('recipes').select('thumbnail').eq('id', recipe);
    // 레시피 테이블 삭제
    const { data: recipeDeleteData, error: recipeDeleteError } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipe);

    if (recipeDeleteError) {
      console.error('Error deleting recipe:', recipeDeleteError);
      return;
    }
    if (thumbnailData) {
      //스토리지 이미지 삭제
      const { data: imageDeleteData, error: imageDeleteError } = await supabase.storage
        .from('images')
        .remove(`/recipeimages/${recipe.id}.${thumbnailData[0].thumbnail.split('.').pop()}`);

      if (imageDeleteError) {
        console.error('Error deleting image:', imageDeleteError);
        return;
      }

      console.log('Recipe and image deleted successfully:', recipeDeleteData);
    }
  }

  async UpdateRecipe(recipe, file) {
    const { data: existingRecipe, error: existingRecipeError } = await supabase
      .from('recipes')
      .select('thumbnail')
      .eq('id', recipe.id)
      .single();

    if (existingRecipeError) {
      console.error('Error fetching existing recipe:', existingRecipeError);
      return;
    }

    const newThumbnail = existingRecipe.thumbnail || null;

    // 새로운 파일이 있는 경우
    if (file) {
      // 기존 파일이 있으면 삭제
      if (newThumbnail) {
        const { error: deleteError } = await supabase.storage.from('images').remove([newThumbnail]);

        if (deleteError) {
          console.error('Error deleting existing file:', deleteError);
          return;
        }
      }

      // 새로운 파일 업로드
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`recipeimages/${recipe.id}.${file.name.split('.').pop()}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading new file:', uploadError);
        return;
      }
      newThumbnail = uploadData.path;
    }

    // 레시피 업데이트
    const { error: updateError } = await supabase
      .from('recipes')
      .update({
        title: recipe.title,
        content: recipe.content,
        thumbnail: newThumbnail
      })
      .eq('id', recipe.id);

    if (updateError) {
      console.error('Error updating recipe:', updateError);
    } else {
      console.log('Recipe updated successfully');
    }
  }
}

export default RecipeAPI;
