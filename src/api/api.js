import AuthAPI from "./auth.api";
import RecipeAPI from "./recipe.api";

class API {
  constructor() {
    this.auth = new AuthAPI();
    this.recipe = new RecipeAPI();
  }
}

const api = new API();
export default api;
