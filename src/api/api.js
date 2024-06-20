import AuthAPI from './auth.api';
import CommentsAPI from './comment';
import RecipeAPI from './recipe.api';

class API {
  constructor() {
    this.auth = new AuthAPI();
    this.recipe = new RecipeAPI();
    this.comment = new CommentsAPI();
  }
}

const api = new API();
export default api;
