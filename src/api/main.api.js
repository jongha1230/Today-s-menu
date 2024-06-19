import supabase from './supabaseAPI';

const fectchRecipes = async () => {
  try {
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) {
      throw Error('데이터 가져오기 실패');
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default fectchRecipes;
