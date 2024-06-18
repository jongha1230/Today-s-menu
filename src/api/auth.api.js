import supabase from './supabaseAPI';

class AuthAPI {
  SignUp = async ({ email, password, nickname }) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      const userId = signUpData.user.id;
      if (signUpError) {
        throw Error(signUpError.message);
      }

      const { data: userData, error: userError } = await supabase.from('users').insert({ id: userId, nickname });
      if (userError) {
        throw Error(userError.message);
      }

      console.log('회원가입 성공!');

      return { signUpData, userData };
    } catch (error) {
      throw new Error(`회원가입 실패 : ${error.message}`);
    }
  };

  SignIn = async ({ email, password }) => {
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        throw Error(signInError.message);
      }
      console.log('로그인 성공!');
      return signInData;
    } catch (error) {
      throw new Error(`회원가입 실패 : ${error.message}`);
    }
  };
}

export default AuthAPI;
