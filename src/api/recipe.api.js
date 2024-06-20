import supabase from './supabaseAPI';

class RecipeAPI {
  // 레시피 목록 불러오기
  async getRecipes() {
    try {
      const { data, error } = await supabase.from('recipes').select('*');
      if (error) {
        throw Error('레시피 목록 데이터 가져오기 실패');
      }
      return data;
    } catch (error) {
      return null;
    }
  }

  // 내가 작성한 레시피 목록 불러오기
  async getMyRecipes(userId) {
    try {
      const { data, error } = await supabase.from('recipes').select('*').eq('user_id', userId);
      if (error) {
        throw Error('레시피 목록 데이터 가져오기 실패');
      }
      return data;
    } catch (error) {
      return null;
    }
  }

  // 레시피 항목 불러오기
  async getRecipeById(recipeId) {
    try {
      const { data, error } = await supabase.from('recipes').select('*').eq('id', recipeId);
      if (error) {
        throw Error('레시피 항목 데이터 가져오기 실패');
      }
      return data;
    } catch (error) {
      return null;
    }
  }

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

      // 저장된 이미지를 다시 URL로 불러오기
      const { data: reloadData, error: reloadError } = await supabase.storage
        .from('images')
        .getPublicUrl(`recipeimages/${recipe.id}.${file.name.split('.').pop()}`);

      if (reloadError) {
        console.error('Error getting public URL:', reloadError);
        return;
      }

      thumbnailUrl = reloadData.publicUrl;
    }
    console.log('Inserting recipe with data:', {
      id: recipe.id,
      title: recipe.title,
      user_id: userId,
      nickname: nickname,
      content: recipe.content,
      thumbnail: thumbnailUrl
    });
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
  async DeleteRecipe(recipeId) {
    try {
      // 레시피 썸네일 데이터 가져오기
      const { data: thumbnailData, error: thumbnailError } = await supabase
        .from('recipes')
        .select('thumbnail')
        .eq('id', recipeId)
        .single();

      if (thumbnailError) {
        throw new Error('레시피 썸네일 데이터 가져오기 실패');
      }

      // 레시피 테이블에서 삭제
      const { data: recipeDeleteData, error: recipeDeleteError } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId);

      if (recipeDeleteError) {
        throw new Error('레시피 삭제 실패');
      }

      if (thumbnailData && thumbnailData.thumbnail) {
        // 이미지 파일 이름에서 확장자 추출
        const extension = thumbnailData.thumbnail.split('.').pop();

        // 스토리지에서 이미지 삭제
        const { error: imageDeleteError } = await supabase.storage
          .from('images')
          .remove(`recipeimages/${recipeId}.${extension}`);

        if (imageDeleteError) {
          throw new Error('이미지 삭제 실패');
        }

        console.log('Recipe and image deleted successfully:', recipeDeleteData);
      } else {
        console.log('Recipe deleted successfully:', recipeDeleteData);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  }

  // 업데이트 메서드
  async UpdateRecipe(recipe, file) {
    console.log(recipe);
    const { data: existingRecipe, error: existingRecipeError } = await supabase
      .from('recipes')
      .select('thumbnail')
      .eq('id', recipe.id)
      .single();

    if (existingRecipeError) {
      console.error('Error fetching existing recipe:', existingRecipeError);
      return;
    }

    let newThumbnail = existingRecipe.thumbnail || null;

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

      // 저장된 이미지를 다시 URL로 불러오기
      const { data: reloadData, error: reloadError } = await supabase.storage
        .from('images')
        .getPublicUrl(`recipeimages/${recipe.id}.${file.name.split('.').pop()}`);

      if (reloadError) {
        console.error('Error getting public URL:', reloadError);
        return;
      }

      newThumbnail = reloadData.publicUrl;
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
