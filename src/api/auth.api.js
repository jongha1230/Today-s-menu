import supabase from './supabaseAPI';

class AuthAPI {
  SignUp = async ({ email, password, nickname }) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      const userId = signUpData.user.id;
      if (signUpError) {
        throw Error(signUpError.message);
      }

      const { data: userData, error: userError } = await supabase.from('users').insert({ id: userId, nickname, email });
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

  SignOut = () => {
    try {
      const { error: signOutError } = supabase.auth.signOut();
      if (signOutError) {
        throw Error(signOutError.message);
      }
      console.log('로그아웃 성공!');
    } catch (error) {
      throw new Error(`로그인 실패 : ${error.message}`);
    }
  };

  GetUser = async () => {
    try {
      const {
        data: { user },
        error: getUserError
      } = await supabase.auth.getUser();
      if (getUserError) {
        throw Error(getUserError.message);
      }

      const {
        data: [usersData],
        error: usersError
      } = await supabase.from('users').select().eq('id', user.id);
      if (usersError) {
        throw Error(usersError.message);
      }

      return {
        id: user.id,
        email: user.email,
        nickname: usersData.nickname,
        profile_picture_url: usersData.profile_picture_url
      };
    } catch (error) {
      throw new Error(`유저 정보 가져오기 실패 : ${error.message}`);
    }
  };

  UpdateUser = async (userInfo) => {
    try {
      const { data: updateUserData, error: updateUserError } = await supabase
        .from('users')
        .update(userInfo)
        .eq('id', userInfo.id);
      if (updateUserError) {
        throw Error(updateUserError.message);
      }
      return updateUserData;
    } catch (error) {
      throw new Error(`유저 정보 수정 실패 : ${error.message}`);
    }
  };
}

export default AuthAPI;
