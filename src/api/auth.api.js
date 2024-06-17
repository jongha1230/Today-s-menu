import { callSupabaseAuth } from "../components/shared/utils/callSupabaseAuth";
import supabase from "./supabaseAPI";

class AuthAPI {
  // 회원 가입 메서드
  async signUp(email, password, nickname) {
    return callSupabaseAuth(
      async () => {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;

        // 추가 정보 users 테이블에 저장
        const userId = signUpData.user.id;

        const { error: userError } = await supabase
          .from("users")
          .insert([{ id: userId, nickname }]);
        if (userError) throw userError;

        return signUpData;
      },
      "회원가입 성공",
      "회원가입 실패"
    );
  }

  // 로그인 메서드
  async signIn(email, password) {
    return callSupabaseAuth(
      () => supabase.auth.signInWithPassword({ email, password }),
      "로그인 성공",
      "로그인 실패"
    );
  }

  // 로그아웃 메서드
  async signOut() {
    return callSupabaseAuth(
      () => supabase.auth.signOut(),
      "로그아웃 성공",
      "로그아웃 실패"
    );
  }

  // 유저 정보 가져오는 메서드
  async getUser() {
    return callSupabaseAuth(
      async () => {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        return { user: session.user };
      },
      "유저 정보 가져오기 성공",
      "유저 정보 가져오기 실패"
    );
  }
}

export default AuthAPI;
